"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_client_1 = require("aws-sdk/lib/dynamodb/document_client");
const uuid_1 = require("uuid");
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';
const db = new document_client_1.DocumentClient();
const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`, DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;
exports.handler = async (event = {}) => {
    console.info('yearh i am called...');
    if (!event.body) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    }
    const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
    item[PRIMARY_KEY] = uuid_1.v4();
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };
    try {
        await db.put(params).promise();
        return { statusCode: 201, body: '' };
    }
    catch (dbError) {
        console.error(`failed to save item ${JSON.stringify(params)}`);
        const errorResponse = dbError.code === 'ValidationException' && dbError.message.includes('reserved keyword') ?
            DYNAMODB_EXECUTION_ERROR : RESERVED_RESPONSE;
        return { statusCode: 500, body: errorResponse };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEVBQW9FO0FBQ3BFLCtCQUF3QjtBQUV4QixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0FBRWxELE1BQU0sRUFBRSxHQUFHLElBQUksZ0NBQWMsRUFBRSxDQUFDO0FBRWhDLE1BQU0saUJBQWlCLEdBQUcseURBQXlELEVBQ2pGLHdCQUF3QixHQUFHLCtGQUErRixDQUFDO0FBRWhILFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxRQUFhLEVBQUUsRUFBa0IsRUFBRTtJQUMvRCxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDZixPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUscURBQXFELEVBQUUsQ0FBQztLQUN6RjtJQUNELE1BQU0sSUFBSSxHQUFHLE9BQU8sS0FBSyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pGLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFFLEVBQUUsQ0FBQztJQUN6QixNQUFNLE1BQU0sR0FBK0I7UUFDekMsU0FBUyxFQUFFLFVBQVU7UUFDckIsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDO0lBRUYsSUFBSTtRQUNGLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQixPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDdEM7SUFBQyxPQUFPLE9BQU8sRUFBRTtRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUM5RCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsSUFBSSxLQUFLLHFCQUFxQixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM5Ryx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7UUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDO0tBQ2pEO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEb2N1bWVudENsaWVudH0gZnJvbSBcImF3cy1zZGsvbGliL2R5bmFtb2RiL2RvY3VtZW50X2NsaWVudFwiO1xyXG5pbXBvcnQge3Y0fSBmcm9tIFwidXVpZFwiO1xyXG5cclxuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUUgfHwgJyc7XHJcbmNvbnN0IFBSSU1BUllfS0VZID0gcHJvY2Vzcy5lbnYuUFJJTUFSWV9LRVkgfHwgJyc7XHJcblxyXG5jb25zdCBkYiA9IG5ldyBEb2N1bWVudENsaWVudCgpO1xyXG5cclxuY29uc3QgUkVTRVJWRURfUkVTUE9OU0UgPSBgRXJyb3I6IFlvdSdyZSB1c2luZyBBV1MgcmVzZXJ2ZWQga2V5d29yZHMgYXMgYXR0cmlidXRlc2AsXHJcbiAgRFlOQU1PREJfRVhFQ1VUSU9OX0VSUk9SID0gYEVycm9yOiBFeGVjdXRpb24gdXBkYXRlLCBjYXVzZWQgYSBEeW5hbW9kYiBlcnJvciwgcGxlYXNlIHRha2UgYSBsb29rIGF0IHlvdXIgQ2xvdWRXYXRjaCBMb2dzLmA7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55ID0ge30pIDogUHJvbWlzZSA8YW55PiA9PiB7XHJcbiAgY29uc29sZS5pbmZvKCd5ZWFyaCBpIGFtIGNhbGxlZC4uLicpO1xyXG4gIGlmICghZXZlbnQuYm9keSkge1xyXG4gICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogNDAwLCBib2R5OiAnaW52YWxpZCByZXF1ZXN0LCB5b3UgYXJlIG1pc3NpbmcgdGhlIHBhcmFtZXRlciBib2R5JyB9O1xyXG4gIH1cclxuICBjb25zdCBpdGVtID0gdHlwZW9mIGV2ZW50LmJvZHkgPT0gJ29iamVjdCcgPyBldmVudC5ib2R5IDogSlNPTi5wYXJzZShldmVudC5ib2R5KTtcclxuICBpdGVtW1BSSU1BUllfS0VZXSA9IHY0KCk7XHJcbiAgY29uc3QgcGFyYW1zOkRvY3VtZW50Q2xpZW50LlB1dEl0ZW1JbnB1dCA9IHtcclxuICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcclxuICAgIEl0ZW06IGl0ZW1cclxuICB9O1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZGIucHV0KHBhcmFtcykucHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHsgc3RhdHVzQ29kZTogMjAxLCBib2R5OiAnJyB9O1xyXG4gIH0gY2F0Y2ggKGRiRXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYGZhaWxlZCB0byBzYXZlIGl0ZW0gJHtKU09OLnN0cmluZ2lmeShwYXJhbXMpfWApXHJcbiAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gZGJFcnJvci5jb2RlID09PSAnVmFsaWRhdGlvbkV4Y2VwdGlvbicgJiYgZGJFcnJvci5tZXNzYWdlLmluY2x1ZGVzKCdyZXNlcnZlZCBrZXl3b3JkJykgP1xyXG4gICAgRFlOQU1PREJfRVhFQ1VUSU9OX0VSUk9SIDogUkVTRVJWRURfUkVTUE9OU0U7XHJcbiAgICByZXR1cm4geyBzdGF0dXNDb2RlOiA1MDAsIGJvZHk6IGVycm9yUmVzcG9uc2UgfTtcclxuICB9XHJcbn07XHJcbiJdfQ==