const {
    create,
    getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail,
  createtask,
  gettask,
  deletetask,
  updatetask
  } = require("./user.service");
  var session = require('express-session')

  const {  genSaltSync , hashSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
     
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
         
        });
      });
    },

    createtask: (req, res) => {
      let body = req.body;
      body.userid = req.decoded.result.id;
      
      
      createtask(body, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
         
        });
      });
    },

    gettask1: (req, res) => {
      // console.log(req.decoded)
      

    const  userid = req.decoded.result.id
    // console.log(userid)
      gettask(userid,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
          
        });
      });
    },


    getUserByUserId: (req, res) => {
      const id = req.params.id;
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found goldy"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    login: (req, res) => {
      const body = req.body;
     
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        
        const result = compareSync(body.password, results.password);
        
        if (result) {
          results.password = undefined;
         
         
          // session = results.id
          const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
            expiresIn: "1h"
          });
        //  var sess=req.session
        //  sess1=sess.results.id
        //  req.session.save();
          // req.session.result = results.id
          // session1 = req.session.result
          console.log(results)
          
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          data: results
          
        });
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      });
    },
 
    getUsers: (req, res) => {
      console.log(req.decoded)
      let userid = req.decoded.result.id
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },

  
    // getUsers: async (req, res) => {
    //   try{
    //     const results = await getUsers(); 
    //     return res.json({
    //       success: 5,
    //       data: results
    //     });
    //   }
    //   catch(e){
    //      console.log("goldy",e);
    //     return res.json({
    //       success: 0,
    //       data: "something went wrong"
    //     });

    //   }
    // },
    updateUsers: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    updatetask: (req, res) => {
      let body = req.body;
      body.userid = req.decoded.result.id;
     
      updatetask(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deleteUser: (req, res) => {
      const data = req.body;
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        // console.log(results);
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found",
            data: results,
            
          });
        }
        return res.json({
          success: 1,
          message: "user deleted successfully"
        });
      });
    },
    deletetask: (req, res) => {
      let data = req.body;
      data.userid = req.decoded.result.id;

      deletetask(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record Not Found"
          });
        }
        return res.json({
          success: 1,
          message: "user deleted successfully"
        });
      });
    }
};