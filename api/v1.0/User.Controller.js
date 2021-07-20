exports.UserLogin = (req, res) => {
    res.status(200).send(Common.ResFormat('0', process.env.Toaster, 'Sorry, something went wrong; please check your internet connection or try again later.', '', {})); 
};