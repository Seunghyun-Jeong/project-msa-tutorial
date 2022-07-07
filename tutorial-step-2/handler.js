const { SQS } = require("aws-sdk");

const sqs = new SQS();

const producer = async (event) => {
  let statusCode = 200;
  let message;

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body was found",
      }),
    };
  }

  try {
    await sqs
      .sendMessage({
        QueueUrl: process.env.QUEUE_URL,
        MessageBody: event.body,
        MessageAttributes: {
          AttributeName: {
            StringValue: "Attribute Value",
            DataType: "String",
          },
        },
      })
      .promise();

    message = "Message accepted!";
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};

const consumer = async (event) => {
  for (const record of event.Records) {
    console.log("Message Body: ", record.body);

    let inputValue, outputValue
    // TODO: Step 1을 참고하여, +1 를 하는 코드를 넣으세요
    let body = JSON.parse(record.body)
    
    inputValue = parseInt(body.input)
    outputValue = inputValue + 1

    const message = `메시지를 받았습니다. 입력값: ${inputValue}, 결과: ${outputValue}`
    console.log(message)

  }
};

module.exports = {
  producer,
  consumer,
};
