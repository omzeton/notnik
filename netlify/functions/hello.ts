import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "We're eating sushi & ginger" }),
    };
};

export { handler };
