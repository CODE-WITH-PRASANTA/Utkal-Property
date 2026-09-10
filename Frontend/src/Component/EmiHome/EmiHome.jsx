import React, { useEffect, useMemo, useState } from 'react';
import { FaChevronDown, FaShareAlt, FaCheck, FaHome } from 'react-icons/fa';
import './EmiHome.css';

const PROPERTIES = [
  { id: 'greenwood-villa', name: 'Utkal Greenwood Villa', location: 'Cuttack', price: 6543120 },
  { id: 'riverside-apartments', name: 'Utkal Riverside Apartments', location: 'Bhubaneswar', price: 4850000 },
  { id: 'smart-homes', name: 'Utkal Smart Homes', location: 'Patia', price: 3250000 },
];

// Fixed home-loan terms — the loan-type selector was removed, so these
// bounds now drive the interest-rate slider and tenure options directly.
const HOME_LOAN = { label: 'Home Loan', minRate: 8.1, maxRate: 11.5, defaultRate: 9.2, maxYears: 30 };

const ALL_TENURES = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30];

const formatINR = (value) =>
  `₹${Math.round(value).toLocaleString('en-IN')}`;

const EmiHome = () => {
  const [propertyId, setPropertyId] = useState(PROPERTIES[0].id);
  const [downPayment, setDownPayment] = useState(Math.round(PROPERTIES[0].price * 0.1));
  const [interestRate, setInterestRate] = useState(HOME_LOAN.defaultRate);
  const [tenureYears, setTenureYears] = useState(15);
  const [shareCopied, setShareCopied] = useState(false);

  const property = PROPERTIES.find((p) => p.id === propertyId) ?? PROPERTIES[0];

  const availableTenures = useMemo(
    () => ALL_TENURES.filter((y) => y <= HOME_LOAN.maxYears),
    []
  );

  // Keep down payment sane whenever the property changes.
  useEffect(() => {
    setDownPayment(Math.round(property.price * 0.1));
  }, [property.id]);

  const principal = Math.max(property.price - downPayment, 0);
  const months = tenureYears * 12;
  const monthlyRate = interestRate / 12 / 100;

  const emi = useMemo(() => {
    if (principal <= 0 || months <= 0) return 0;
    if (monthlyRate === 0) return principal / months;
    const factor = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * factor) / (factor - 1);
  }, [principal, monthlyRate, months]);

  const totalPayable = emi * months;
  const totalInterest = Math.max(totalPayable - principal, 0);

  const downPaymentPercent = property.price > 0 ? (downPayment / property.price) * 100 : 0;
  const interestRangePercent =
    ((interestRate - HOME_LOAN.minRate) / (HOME_LOAN.maxRate - HOME_LOAN.minRate)) * 100;

  const handleShare = async () => {
    const summary = `${property.name} — Home Loan EMI: ${formatINR(emi)}/mo for ${tenureYears} yrs @ ${interestRate.toFixed(1)}%`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Loan EMI Estimate', text: summary });
        return;
      }
      await navigator.clipboard.writeText(summary);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1800);
    } catch {
      // User cancelled the native share sheet — no action needed.
    }
  };

  return (
    <section className="emi-home">
      <div className="emi-home__wrapper">
        <div className="emi-home__layout">

          {/* ==========================================
              MAIN COLUMN — property + inputs
          ========================================== */}
          <div className="emi-home__main">

            <div className="emi-home__header">
              <span className="emi-home__eyebrow">Home Loan EMI Calculator</span>
              <h2 className="emi-home__title">
                Calculate your Loan EMI for{' '}
                <span className="emi-home__title-highlight">{property.name}</span>
              </h2>

              <div className="emi-home__field">
                <label className="emi-home__field-label" htmlFor="emi-home-property">
                  Select Property
                </label>
                <div className="emi-home__select-wrapper">
                  <FaHome className="emi-home__select-leading-icon" aria-hidden="true" />
                  <select
                    id="emi-home-property"
                    className="emi-home__select"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                  >
                    {PROPERTIES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.location}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="emi-home__select-chevron" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="emi-home__price-row">
              <span className="emi-home__price-label">Property Price in {property.location}</span>
              <span className="emi-home__price-value">{formatINR(property.price)}</span>
            </div>

            <div className="emi-home__slider-block">
              <div className="emi-home__slider-head">
                <span className="emi-home__slider-label">Down Payment</span>
                <span className="emi-home__slider-value">{formatINR(downPayment)}</span>
              </div>
              <input
                type="range"
                className="emi-home__slider-track"
                min={0}
                max={property.price}
                step={5000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                style={{ '--emh-fill': `${downPaymentPercent}%` }}
                aria-label="Down payment amount"
              />
              <div className="emi-home__slider-scale">
                <span>₹0</span>
                <span>{formatINR(property.price)}</span>
              </div>
            </div>

            <div className="emi-home__slider-block">
              <div className="emi-home__slider-head">
                <span className="emi-home__slider-label">Bank Interest Rate</span>
                <span className="emi-home__slider-value">{interestRate.toFixed(1)} %</span>
              </div>
              <input
                type="range"
                className="emi-home__slider-track"
                min={HOME_LOAN.minRate}
                max={HOME_LOAN.maxRate}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ '--emh-fill': `${interestRangePercent}%` }}
                aria-label="Bank interest rate"
              />
              <div className="emi-home__slider-scale">
                <span>{HOME_LOAN.minRate}%</span>
                <span>{HOME_LOAN.maxRate}%</span>
              </div>
            </div>

            <div className="emi-home__tenure-block">
              <span className="emi-home__tenure-label">Loan Period (Years)</span>
              <div className="emi-home__tenure-grid">
                {availableTenures.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={`emi-home__tenure-btn ${
                      tenureYears === year ? 'emi-home__tenure-btn--active' : ''
                    }`}
                    onClick={() => setTenureYears(year)}
                    aria-pressed={tenureYears === year}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ==========================================
              SIDE COLUMN — sticky live estimate
          ========================================== */}
          <aside className="emi-home__side">
            <div className="emi-home__side-card">
              <span className="emi-home__side-eyebrow">Your Estimate</span>

              <div className="emi-home__result-hero">
                <span className="emi-home__result-amount">{formatINR(emi)}</span>
                <span className="emi-home__result-caption">per month · calculated on property price</span>
              </div>

              <div className="emi-home__summary">
                <div className="emi-home__summary-row">
                  <span className="emi-home__summary-label">Total Loan Amount</span>
                  <span className="emi-home__summary-value">{formatINR(principal)}</span>
                </div>
                <div className="emi-home__divider" />
                <div className="emi-home__summary-row">
                  <span className="emi-home__summary-label">Total Interest Payable</span>
                  <span className="emi-home__summary-value">{formatINR(totalInterest)}</span>
                </div>
                <div className="emi-home__divider" />
                <div className="emi-home__summary-row">
                  <span className="emi-home__summary-label">Payable Amount</span>
                  <span className="emi-home__summary-value">{formatINR(totalPayable)}</span>
                </div>
              </div>

              <button
                type="button"
                className={`emi-home__share-btn ${shareCopied ? 'emi-home__share-btn--copied' : ''}`}
                onClick={handleShare}
              >
                {shareCopied ? (
                  <>
                    <FaCheck className="emi-home__result-share-icon" />
                    Copied
                  </>
                ) : (
                  <>
                    <FaShareAlt className="emi-home__result-share-icon" />
                    Share Estimate
                  </>
                )}
              </button>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default EmiHome;