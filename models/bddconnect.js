
var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://admin:admin@cluster0.8ipot.mongodb.net/Ticetac?retryWrites=true&w=majority',
      options,        
      function(err) {
       if(err){
       console.log(err);
        } else {
        console.log('____________BDD OK_________________')
        }
      }
   );

module.exports = mongoose;