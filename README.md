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

## Setup Project

Head over to your preffered Code editor, the folowing will use VS Code. 

Run the following Command to make a new Project

```
npx create-dna-discord-bot <ProjectName>
```

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/702fd3c6-216b-4b43-b2ec-8990d578e4ed)


Open it in VS Code by running the following 2 Commands

```
cd <ProjectName>
code .
```

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/4bfdf57a-70e8-4a50-86fa-1ee7fb8b5814)

VS Code should now be open with a similar file structure to the following.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/3a09b2b6-f1e5-4127-a944-0e7116420ea1)

In your VS Code Terminal type the following to start the Discord Bot

```
npm run start
```

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/7aa05ccf-9808-46bd-aef2-9f7a2eb616ff)


You will be prompted to provide a Token, to do this you must create a Discord Application, invite it to a server and then Generate a token for it.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/27b4fdea-5326-4ac7-b4eb-0299d388bdaa)


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

## Generating Token and Login

Back in Discord Applications, go to the "Bot" Tab

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/768fa36e-a7b7-4865-bc05-5f6f74341e4a)

Click the "Reset Token" Button, you may be prompted for a 2 Factor Authentication if you have that set up

It will then show your token with a "Copy" button.

**Do Not Share Your Token Anywhere**

If shared you Bot can be comprimised. Discord will also search for your token and if found on the internet will deactivate it.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/d2b5ed10-ca2b-4017-99f7-75ed77fdf8de)

Copy your Token and paste it in the Command Line for the Program. You should receive something similar

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/5bf602ea-acde-4e63-bf44-9917507f3278)

If you have invited the Bot to multiple Servers you may be prompted to input the name of the Server you want it connected to.

Notice that a Resource Folder is created with the Bots Data and a Log file. Make sure to add these files to your GitIgnore in order not to compromise your Token or other important information

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/5a206e49-e87c-4845-a86a-b64272e52b28)

Going back to Discord, you should notice that your Bot is now online 

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/1b9154cf-3744-4739-8edb-c07033c9db18)


## Run your First Command

The Bot comes with a few default Commands. With a new Project it comes with the Hello World Command

In the Discord Server start typing "/helloworld"

The command should appear in a Window

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/e598994d-6f0e-4921-a4bd-201804b49d64)

Click on the Name to complete it and then Run the Command.

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/5ee3bd75-d08d-4770-8508-aba7f231278c)

![image](https://github.com/Nano-DNA-Studios/DNA-Discord-Framework/assets/93613553/a2e5ef25-8c39-482e-912b-e98902afeb2a)

# Creating your own Command


