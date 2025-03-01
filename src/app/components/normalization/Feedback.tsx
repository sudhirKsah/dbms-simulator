export default function Feedback({ feedback }) {
    return (
      <div className={`mt-6 p-4 rounded-md ${
        feedback.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
      }`}>
        <h3 className={`text-lg font-semibold mb-2 ${
          feedback.success ? "text-green-700" : "text-red-700"
        }`}>
          {feedback.success ? "Success!" : "Not Quite Right"}
        </h3>
        
        <p className="mb-3">{feedback.message}</p>
        
        {feedback.details && feedback.details.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Details:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {feedback.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        )}
        
        {feedback.suggestions && feedback.suggestions.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium mb-2">Suggestions:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }