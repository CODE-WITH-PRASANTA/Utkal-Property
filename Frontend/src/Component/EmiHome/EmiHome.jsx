import React, { useMemo, useState } from 'react';
import { FaShareAlt, FaCheck, FaRupeeSign } from 'react-icons/fa';
import './EmiHome.css';

const HOME_LOAN = { 
  minRate: 8.1, 
  maxRate: 11.5, 
  defaultRate: 9.2, 
  maxYears: 30 
};

const ALL_TENURES = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30];

const formatINR = (value) =>
  `₹${Math.round(value || 0).toLocaleString('en-IN')}`;

const EmiHome = () => {
  const [totalAmount, setTotalAmount] = useState(5000000);
  const [downPayment, setDownPayment] = useState(500000);
  const [interestRate, setInterestRate] = useState(HOME_LOAN.defaultRate);
  const [tenureYears, setTenureYears] = useState(15);
  const [shareCopied, setShareCopied] = useState(false);

  // Handle direct typing in the Total Amount input field
  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numValue = Number(rawValue);
    setTotalAmount(numValue);

    // Keep down payment proportional or clamped
    if (downPayment > numValue) {
      setDownPayment(numValue);
    }
  };

  const availableTenures = useMemo(
    () => ALL_TENURES.filter((y) => y <= HOME_LOAN.maxYears),
    []
  );

  const principal = Math.max(totalAmount - downPayment, 0);
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

  const downPaymentPercent = totalAmount > 0 ? (downPayment / totalAmount) * 100 : 0;
  const interestRangePercent =
    ((interestRate - HOME_LOAN.minRate) / (HOME_LOAN.maxRate - HOME_LOAN.minRate)) * 100;

  const handleShare = async () => {
    const summary = `Home Loan EMI: ${formatINR(emi)}/mo for ${tenureYears} yrs @ ${interestRate.toFixed(1)}% (Loan: ${formatINR(principal)})`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Loan EMI Estimate', text: summary });
        return;
      }
      await navigator.clipboard.writeText(summary);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1800);
    } catch {
      // Sheet closed
    }
  };

  return (
    <section className="emi-home">
      <div className="emi-home__wrapper">
        <div className="emi-home__layout">

          {/* MAIN INPUT COLUMN */}
          <div className="emi-home__main">
            <div className="emi-home__header">
              <span className="emi-home__eyebrow">Home Loan EMI Calculator</span>
              <h2 className="emi-home__title">
                Calculate your <span className="emi-home__title-highlight">Monthly EMI</span>
              </h2>

              <div className="emi-home__field">
                <label className="emi-home__field-label" htmlFor="emi-home-amount">
                  Enter Property Value / Total Amount
                </label>
                <div className="emi-home__input-wrapper">
                  <FaRupeeSign className="emi-home__input-leading-icon" aria-hidden="true" />
                  <input
                    id="emi-home-amount"
                    type="text"
                    inputMode="numeric"
                    className="emi-home__input"
                    value={totalAmount ? totalAmount.toLocaleString('en-IN') : ''}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            </div>

            {/* DOWN PAYMENT SLIDER */}
            <div className="emi-home__slider-block">
              <div className="emi-home__slider-head">
                <span className="emi-home__slider-label">Down Payment</span>
                <span className="emi-home__slider-value">
                  {formatINR(downPayment)}{' '}
                  <span className="emi-home__slider-subtext">
                    ({downPaymentPercent.toFixed(0)}%)
                  </span>
                </span>
              </div>
              <input
                type="range"
                className="emi-home__slider-track"
                min={0}
                max={totalAmount || 100000}
                step={10000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                style={{ '--emh-fill': `${Math.min(downPaymentPercent, 100)}%` }}
                aria-label="Down payment amount"
              />
              <div className="emi-home__slider-scale">
                <span>₹0</span>
                <span>{formatINR(totalAmount)}</span>
              </div>
            </div>

            {/* INTEREST RATE SLIDER */}
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

            {/* TENURE SELECTOR */}
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

          {/* SIDE ESTIMATE COLUMN */}
          <aside className="emi-home__side">
            <div className="emi-home__side-card">
              <div>
                <span className="emi-home__side-eyebrow">Your Estimate</span>

                <div className="emi-home__result-hero">
                  <span className="emi-home__result-amount">{formatINR(emi)}</span>
                  <span className="emi-home__result-caption">per month · estimated repayment</span>
                </div>

                <div className="emi-home__summary">
                  <div className="emi-home__summary-row">
                    <span className="emi-home__summary-label">Principal Loan Amount</span>
                    <span className="emi-home__summary-value">{formatINR(principal)}</span>
                  </div>
                  <div className="emi-home__divider" />
                  <div className="emi-home__summary-row">
                    <span className="emi-home__summary-label">Total Interest Payable</span>
                    <span className="emi-home__summary-value">{formatINR(totalInterest)}</span>
                  </div>
                  <div className="emi-home__divider" />
                  <div className="emi-home__summary-row">
                    <span className="emi-home__summary-label">Total Payable Amount</span>
                    <span className="emi-home__summary-value">{formatINR(totalPayable)}</span>
                  </div>
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