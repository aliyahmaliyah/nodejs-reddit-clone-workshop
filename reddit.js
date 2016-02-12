var Sequelize = require('sequelize');

var db = new Sequelize('reddit', 'aliyahmaliyah', '', {
    dialect: 'mysql'
});

var User = db.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING // TODO: make the passwords more secure!
});

// Even though the content belongs to users, we will setup the userId relationship later
var Content = db.define('content', {
    url: Sequelize.STRING,
    title: Sequelize.STRING
});

// Even though a vote has a link to user and content, we will setup the relationship later
var Vote = db.define('vote', {
    upVote: Sequelize.BOOLEAN
});

// User <-> Content relationship
Content.belongsTo(User); // This will add a `setUser` function on content objects
User.hasMany(Content); // This will add an `addContent` function on user objects

// User <-> Vote <-> Content relationship
User.belongsToMany(Content, {
    through: Vote,
    as: 'Upvotes'
}); // This will add an `add`
Content.belongsToMany(User, {
    through: Vote
});

//db.sync(); // Only needs to be used once!

//Write a function called createNewUser that takes a username, password and callback. 
//This function will create a new user with Sequelize and call the callback once the user has been created

function createNewUser(username, password, cb) {
    User.create({username: username, password: password}).then(function(user) { // then is saying "once you've done creating the user, then you're going to run the function on a user which is defined when the first function is called"
       cb(user); 
    });
    
}
createNewUser('aliyahmaliyah','blahbah', function(promisedUser) { // this is the call back. you specify in THIS funciton what you want it to do
  //console.log('there he is!!!', promisedUser); 
});

//Write a function called createNewContent that takes a user ID, a URL, a title and a callback. This function will 
//create a new Content item that is immediately associated with the user object passed to it. Once the content is created, 
//your function will call the callback with that content.
//Note that you will have to find the user by its ID before you can associate the content to the user.

function createNewContent(userID, url, title, cb){
    User.findById(userID).then(function(user){ // once you've found the userID I want you to create content associated with that user ID
    user.createContent({
        url: url,
        title: title
    }).then(function (content) {
        cb(content)
    })
    });
}
createNewContent(1,'http://google.com', 'I heart google', function(content){
    console.log(content);
})