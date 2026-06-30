import axios from "axios";
const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL
//     const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
// You are not Google. You will now behave like a voice-enabled assistant.

// Your task is to understand the user's natural language input and respond with a JSON object like this:

// {
//   "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",

//   "userInput": "<original user input>" {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,

//   "response": "<a short spoken response to read out loud to the user>"
// }

// Instructions:
// - "type": determine the intent of the user.
// - "userinput": original sentence the user spoke.
// - "response": A short voice-friendly reply, e.g. "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

// Type meanings:
// - "general": if it's a factual or informational question. aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
// - "google-search": if user wants to search something on Google.
// - "youtube-search": if user wants to search something on YouTube.
// - "youtube-play": if user wants to directly play a video or song.
// - "calculator-open": if user wants to open a calculator.
// - "instagram-open": if user wants to open Instagram.
// - "facebook-open": if user wants to open Facebook.
// - "weather-show": if user wants to know weather.
// - "get-time": if user asks for current time.
// - "get-date": if user asks for today's date.
// - "get-day": if user asks what day it is.
// - "get-month": if user asks for the current month.

// Important:
// - Use ${userName} agar koi puche tume kisne banaya
// - Only respond with the JSON object, nothing else.


// now your userInput: ${command}
// `;

const prompt = `
You are a virtual voice assistant named ${assistantName}, created by ${userName}.

Your job is ONLY to classify the user's command and return a JSON object.

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT use \`\`\`json.
Do NOT explain anything.

Return this format:

{
  "type": "",
  "userInput": "",
  "response": ""
}

Allowed types:

- general
- google-search
- youtube-search
- youtube-play
- get-time
- get-date
- get-day
- get-month
- calculator-open
- instagram-open
- facebook-open
- weather-show

Rules:

1. If the user wants to SEARCH on Google
Examples:
- search AI on google
- google virat kohli
- google weather

Return

{
"type":"google-search",
"userInput":"AI",
"response":"Searching Google."
}

2. If the user wants to SEARCH on YouTube

Examples:
- search songs on youtube
- youtube funny videos
- find react tutorial on youtube

Return

{
"type":"youtube-search",
"userInput":"songs",
"response":"Searching YouTube."
}

3. If the user wants to OPEN YouTube

Examples:
- open youtube
- open the youtube
- youtube kholo
- go to youtube
- launch youtube

Return

{
"type":"youtube-search",
"userInput":"",
"response":"Opening YouTube."
}

4. If user wants to PLAY something

Examples

- play despacito
- play hanuman chalisa
- play shape of you

Return

{
"type":"youtube-play",
"userInput":"despacito",
"response":"Playing it on YouTube."
}

5. If user says

open calculator

Return

{
"type":"calculator-open",
"userInput":"",
"response":"Opening Calculator."
}

6. If user says

open instagram

Return

{
"type":"instagram-open",
"userInput":"",
"response":"Opening Instagram."
}

7. If user says

open facebook

Return

{
"type":"facebook-open",
"userInput":"",
"response":"Opening Facebook."
}

8. If user asks weather

Return

{
"type":"weather-show",
"userInput":"",
"response":"Showing weather."
}

9. Time

Return

{
"type":"get-time",
"userInput":"",
"response":"Current time."
}

10. Date

Return

{
"type":"get-date",
"userInput":"",
"response":"Today's date."
}

11. Day

Return

{
"type":"get-day",
"userInput":"",
"response":"Today is..."
}

12. Month

Return

{
"type":"get-month",
"userInput":"",
"response":"Current month."
}

13. Everything else

Return

{
"type":"general",
"userInput":"<original sentence without assistant name>",
"response":"<short answer>"
}

If user asks

Who created you?

Reply

{
"type":"general",
"userInput":"Who created you?",
"response":"I was created by ${userName}."
}

User command:

${command}
`;




    const result = await axios.post(apiUrl, {
      "contents": [{
        "parts": [{ "text": prompt }]
      }]
    })
    return result.data.candidates[0].content.parts[0].text
    //     } catch (error) {
    //       console.log(error)
    //     }
    // }
  } catch (error) {
    console.error("Gemini Error:");

    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    return null;
  }
}

export default geminiResponse
