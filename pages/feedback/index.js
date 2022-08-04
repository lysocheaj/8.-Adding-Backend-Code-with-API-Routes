import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { Fragment, useState } from "react";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();
  function loadFeedbackHandler(id) {
    try {
      fetch(`/api/feedback/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFeedbackData(data.feedback);
        }); // /api/some-feedback-id
    } catch (e) {
      console.log("err ", e.message);
    }
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Detail
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
