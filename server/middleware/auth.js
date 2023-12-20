module.exports = {
    /* ensureAuth: function (req, res, next, err) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        console.log(err);
        res.redirect('/')
      }
    } */
    ensureAuth: async function (req, res, next, err) {
      try {
        if (req.isAuthenticated()) {
          return next()
        }  
      } catch (error) {
        console.log(err);
        res.redirect('/')
      }
    }
  }
  
  // this middleware checks if we are logged in, if not it will send us back to home page, this allows us to secure our todos pages so that no one can bypass the sign in wall.
  //ensureAuth is used in our todos.js file inside our routes.