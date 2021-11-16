/*document.addEventListener("DOMContentLoaded", () => {
	const Inputfield = document.getElementById("input");
	Inputfield.addEventListener("keydown", (e) => {
		if (e.code == "Enter"){
			let input = Inputfield.value;
			Inputfield.value = "";
			output(input);
		}
	});
	});
function output(input){
			let product;
			let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
			text = text
     			.replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    			.replace(/i feel /g, "")
                .replace(/whats/g, "what is")
    			.replace(/please /g, "")
    			.replace(/ please/g, "")
    			.replace(/r u/g, "are you");

    			if (compare (prompts, replies, text)) {
    				product = compare(prompts, replies, text);
    			}
    			else if (text.match(/thank/gi)) {
    				product = "You are welcome";
    			}
    			else if (text.match(/(corona|covid|virus)/gi)) {
    				product = CoronaVirus[Math.floor(Math.random()*CoronaVirus.Length)];
    			}
    			else{
    				Alternatives = Alternatives[Math.floor(Math.random()*Alternatives.Length)]
    			}
    			addChat(input, product);
		}
		function compare(promptsArray, repliesArray, string){
			let reply;
			let replyFound = false;
			for (let x = 0;
				 x < promptsArray.length;
				 x = x + 1)
			{
				for (let y = 0;
					 y < promptsArray[x].length;
					 y = y + 1)
				{
					if (promptsArray[x][y] == string) {
						let replies = repliesArray[x];
						reply = replies[Math.floor(Math.random() * replies.length)];
						replyFound = true;
						break;
					}
				}
				if (replyFound) {
					break;
				}
			}
			return reply
		}	
		function addChat(input, product){
			const messagesContainer = document.getElementById("messages");
			let userdiv = document.createElement("div");
			userdiv.id = "user";
			userdiv.className = "user response"; 
			userdiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
			messagesContainer.appendChild(userdiv);
			let botDiv = document.createElement("div");
			let botImage = document.createElement("img");
			let botText = document.createElement("span");
			botDiv.id = "bot";
			botImage.src = "##";
			botImage.className = "avatar";
			botDiv.className = "Bot response";
			botText.innerText = "The bot is typing ...";
			botDiv.appendChild(botText);
			botDiv.appendChild(botImage);
			messagesContainer.appendChild(botDiv);
			messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
			setTimeout(()=>{
				botText.innerText = `${product}`;
			},2000)
		}*/

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) { 
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronaVirus[Math.floor(Math.random() * coronaVirus.length)];
  } else {
    // If all else fails: random alternative
    product = Alternatives[Math.floor(Math.random() * Alternatives.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="https://image.flaticon.com/icons/png/512/17/17004.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "ChatBotGIFImage2.GIF";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    TextToSpeech(product);
  }, 2000
  )

}