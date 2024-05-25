# DNA-Discord-Framework 
NPM package with bundled functionality allowing for advanced and quick development of Discord Bots


# Create a New Project with DNA-Discord-Framework 
Run the Following command to create a new Project. Project name can be in capitals.
```
npx create-dna-discord-bot <ProjectName>
```

To test it out immediatly run. If you haven't set up your Discord Bot follow the Getting Started Section.
```
npm run start
```

# Installing through NPM
```
npm install dna-discord-framework
```

# Getting Started
The following will show the basics on how to get started and use the 

## Create Discord Application
Start by heading over to [Discord Applications](https://discord.com/developers/applications) and Login using your Discord Account

You will then receive a page looking like the following
![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/a8b4e6d7-5848-46ae-b2f4-c8536c83f4d9)

Click on the "New Application" Button.

You will be prompted to name the Discord Bot, and agree to the Terms and click "Create"

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/b88e43f6-f6de-42dd-bea1-d92cc8c96b0e)

This leads you to the Following page

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/385a6112-4978-4855-a079-a4ed1a8d2786)

You can fill out this information to customize your bot and give it personality. You can fill this out later.


## Setup Bot and Invite to Server

Go to the "Bot" Tab.

Make sure you turn the "Public Bot" Setting Off and turn on all the Settings in "Priveleged Gateway Intents"

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/cb461e54-a96f-47ae-a261-db21641fe981)

Head over to the "OAuth2" Tab.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/647acd2f-a9b1-4918-a4a9-2efe9b5a10dd)

In the OAuth URL Generator section select the "Bot" and "application.commands" boxes

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/2ab8b5d1-81ae-4220-a6a9-e37df48c916c)

To avoid issues in the future check the Administrator boxes, this gives all permissions to the Bot. Once you're more familiar with setting up a bot you can be more selective

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/29c70d50-04e3-4794-849d-9dbedc49aeee)

At the bottom of the Page a URL will be generated copy it

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/4850e1d8-e20f-488f-b8df-18cde49f7346)

**Inviting Requires Admin Priviliges** 

Paste it in the Server you want to invite it to and Click on it.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/cddf483b-8d44-4773-a296-1d4eb7ef4705)

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/279aebef-e929-4de2-9d45-a9b3b1680d71)

Click "Continue"

Click "Authorize"

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/2062dfe7-0467-4f81-af12-b4a311d9750c)

The Bot should now be added.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/fcf486d6-a884-49a6-9d11-448fbf7dbe69)

If Successful they should appear in the Server.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/e2d25b27-9c22-4e09-a9fb-311763fcd79f)

The Bot can't be used and Won't be online until you make your own Discord Project

# Make Bot Go Online with Default Settings

## Setup Project

Head over to your preffered Code editor, the folowing will use VS Code. 

Create a new Folder in the location you want to store your Bot and then drag the Folder into the VS Code Window to open the project

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/7eed2a6c-f852-466a-a5a9-9bf2f0424640)

Run the Following in the VS Code Terminal or Equivalent

```
npm init -y  
```

```
npm install typescript --save-dev
```

```
npx tsc --init
```

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/3293022b-7f74-4679-8604-58cdf02106e8)


## Create Base Bot

Now install the NPM Package using the following command.

```
npm install dna-discord-framework
```

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/df62192a-58fe-49a5-aac1-a53244660ef1)



Create a new file named "index.ts" 

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/8de74173-ee36-40b7-963d-4b344b9ff825)



Inside your "index.ts" file, add the following code

```typescript
import { DiscordBot, BotDataManager } from "dna-discord-framework";

const Bot = new DiscordBot(BotDataManager);

Bot.StartBot();
```

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/45aa00a8-795b-474e-b9ff-2e67a2222487)

Next, run the following in the terminal, this will create a JavaScript file in your project

```
tsc
```

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/c9aca3e6-faeb-481f-a0b9-66eb0c82f5a6)

Finally run the following to start the Bot

```
node index.js
```

You will be prompted to provide a Token

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/588a80c5-a747-4b9d-8594-23132411aded)


## Generating Token and Login

Back in Discord Applications, go to the "Bot" Tab

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/768fa36e-a7b7-4865-bc05-5f6f74341e4a)

Click the "Reset Token" Button, you may be prompted for a 2 Factor Authentication if you have that set up

It will then show your token with a "Copy" button.

**Do Not Share Your Token Anywhere**

If shared you Bot can be comprimised. Discord will also search for your token and if found on the internet will deactivate it.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/d2b5ed10-ca2b-4017-99f7-75ed77fdf8de)

Copy your Token and paste it in the Command Line for the Program. You should receive something similar

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/641b82e4-5846-4bf9-9412-d5014521b222)

If you have invited the Bot to multiple Servers you may be prompted to input the name of the Server you want it connected to.


Notice that a Resource Folder is created with the Bots Data and a Log file. Make sure to add these files to your GitIgnore in order not to compromise your Token or other important information

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/330f6950-16ec-4f77-8ce1-5de50d8dda32)


Going back to Discord, you should notice that your Bot is now online 

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/1b9154cf-3744-4739-8edb-c07033c9db18)


## Run your First Command

The Bot comes with a few default Commands. The first is Setting the Log Channel. This is not required but can be useful to debug things in the future if you need it.

In the Discord Server start typing "/setlogchannel"

The command should appear in a Window

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/f012844a-d783-4dde-b2c4-e64b7b9cb600)

Click on it to complete the Command, you will then see a new Window appear for your options.

Pick an appropriate Channel to send Logs to, in our case it will be #general

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/0f7dac02-e881-4d80-acee-00f500fc5a10)

Now run the command.

You will get an ephemeral message. This is only visible to you

** All Command Responses are Ephemeral, Once a Log Channel is set a copy of the Response is sent to the Log Channel**

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/34f9da4c-889b-4748-897b-982993f6c76d)

Now that a Log Channel is set Responses will be sent there for Future Commands.

If needed the Bot also keeps tracks of Logs. This can be accessed in the log.txt file. Alternatively you can get them through Discord by running the following Command

```
/getlogs
```

The logs file should be sent and Downloadable now

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/dc629b91-424c-4ec4-8bed-d8246081e2ca)

Logs keep track of the user who called Commands, Name of the Command, Response Message and the Date and time the Command was called


# Creating your own Command


