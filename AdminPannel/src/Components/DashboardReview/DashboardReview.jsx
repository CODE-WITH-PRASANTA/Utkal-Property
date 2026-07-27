import React from "react";
import "./DashboardReview.css";

import reviewImage1 from "../../assets/reviewimage1.webp";
import reviewImage2 from "../../assets/reviewimage2.webp";
import reviewImage3 from "../../assets/reviewimage3.webp";
import reviewImage4 from "../../assets/reviewimage4.webp";
import reviewImage5 from "../../assets/reviewimage5.webp";
import reviewImage6 from "../../assets/reviewimage6.webp";

const reviews = [
  {
    id: 1,
    image: reviewImage1,
    name: "Bessie Cooper",
    time: "3 day ago",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra semper convallis. Integer vestibulum tempus tincidunt.",
  },
  {
    id: 2,
    image: reviewImage2,
    name: "Annette Black",
    time: "3 day ago",
    review:
      "Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum. Fusce at dui tincidunt nulla semper venenatis at et magna. Mauris turpis lorem, ultricies vel justo sed, ultrices auctor nisi.",
  },
  {
    id: 3,
    image: reviewImage3,
    name: "Albert Flores",
    time: "3 day ago",
    review:
      "Sed ac ultrices nunc, in posuere lacus. Pellentesque ullamcorper pretium purus sit amet molestie.",
  },
  {
    id: 4,
    image: reviewImage4,
    name: "Jerome Bell",
    time: "3 day ago",
    review:
      "Maecenas eu lorem et urna accumsan vestibulum vel vitae magna.",
  },
  {
    id: 5,
    image: reviewImage5,
    name: "Albert Flores",
    time: "3 day ago",
    review:
      "Nullam rhoncus dolor arcu, et commodo tellus semper vitae. Aenean finibus tristique lectus, ac lobortis mauris venenatis ac.",
  },
  {
    id: 6,
    image: reviewImage6,
    name: "Ralph Edwards",
    time: "3 day ago",
    review:
      "Fusce sit amet purus eget quam eleifend hendrerit nec a erat. Sed turpis neque, iaculis blandit viverra ut, dapibus eget nisi.",
  },
];

const DashboardReview = () => {
  return (
    <div className="dashboardReview">

      <h2 className="dashboardReviewTitle">All review</h2>

      <div className="dashboardReviewWrapper">

        {reviews.map((item) => (
          <div className="dashboardReviewCard" key={item.id}>

            <div className="dashboardReviewHeader">

              <img
                src={item.image}
                alt={item.name}
                className="dashboardReviewImage"
              />

              <div className="dashboardReviewContent">

                <div className="dashboardReviewTop">
                  <h4>{item.name}</h4>
                  <span>{item.time}</span>
                </div>

                <p>{item.review}</p>

                <div className="dashboardReviewStar">
                  ★★★★★
                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default DashboardReview;