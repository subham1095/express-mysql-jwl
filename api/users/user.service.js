const { Session } = require("express-session");
const session = require("express-session");
const pool = require("../../config/database");
 // const knex   = require("../../config/database");
//  const jwt = require("jsonwebtoken");
//  let token = req.get("authorization");
//  token = token.slice(7);

module.exports = {
  create: (data, callBack) => {
    
    pool.query(
      `insert into registration(firstName, lastName, gender, email, password, number) 
                values(?,?,?,?,?, data.userid)`,
      [
        data.firstName,

        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
         
        }
        return callBack(null, results);
       
      }
    );
  },

  createtask: (data, callBack) => {
    
    pool.query(
      `insert into task( task, description , userid) 
                values(?,?,?)`,
      [
        

        data.task,
        data.description,
        data.userid,
     
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
         
        }
        return callBack(null, results);
       
      }
    );
  },

  gettask: (userid, callBack) => {
    pool.query(
      `select task_id,task,description from task where userid = ?`,
      [userid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  // create: knex.select().from('registration')
  // .asCallback(function(err, rows) {
  //   if (err) return console.error(err);
   
  // }),
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
//   getUsers: async () => {
//   knex('users')
//   .select({
//     id: 'id',
//     name: 'name'
//   })
//   .then((users) => {
//     return res.json(users);
//   })
//   .catch((err) => {
//     console.error(err);
//     return res.json({success: false, message: 'An error occurred, please try again later.'});
//   })
// },
// getUsers: () => knex.select().from('registration')
// .asCallback(function(err, rows) {
//   if (err){return console.error(err)} 
//   else return rows;
 
// }),
  // getUsers:  () => {
    // console.log("goldy");
    // return new Promise((resolve, reject) => {
    //    pool.query(
    //      `select id,firstName,lastName,gender,email,number from registration`,
    //  { knex.select().table("registration"),
      
        
        // (error, results, fields) => {
        //   if (error) {
        //     reject(error);
        //   }
        //   return resolve(results);
        // }
     // };

    // });
      // let data = await knex.select().table("registration");
      // // console.log("goldy",data);
      // return{
      //   data
      // }
     
  
  //  },
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updatetask: (data, callBack) => {
    pool.query(
      `update task set task=?, description=? where task_id = ? and userid = ?`,
      [
        data.task,
        data.description,
        data.task_id,
        data.userid
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deletetask: (data1, callBack) => {
    pool.query(
      `delete from task where task_id = ? and userid = ?`,
      [data1.task_id,data1.userid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};