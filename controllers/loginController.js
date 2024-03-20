//metamaskLoginController.js

const Login = async (req, res) => {
    // const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })
    const resdata = {
        msg: 'respond with a resource'

    }
    // if (!tour) {
    //   return next(new AppError('No tour found with that ID', 404));
    // }
  
    res.status(200).json({
      status: 'success',
      data: {
        res: resdata
      }
    });
  };
module.exports = {Login}