import { useParams, Route, Link,useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote, true);
  
  const {quotesId} =params;

  useEffect(() => {
    sendRequest(quotesId);
  }, [sendRequest,quotesId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuotes.text) {
    return <p>No Quote Found</p>;
  }
  
  return (
    <>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link
            className="btn--flat"
            to={`${match.url}/comments`}
          >
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
