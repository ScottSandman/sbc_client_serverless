/* eslint-disable-line */ const aws = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider(
    { apiVersion: "2016-04-18" }
  );

  const clientGroup = event.request.userAttributes["custom:group"];

  const addUserParams = {
    GroupName: clientGroup,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  try {
    await cognitoidentityserviceprovider
      .adminAddUserToGroup(addUserParams)
      .promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  }
};
