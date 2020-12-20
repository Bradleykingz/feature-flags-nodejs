const express = require('express');
const router = express.Router();
const {isEnabled, getVariant} = require('unleash-client');

/* GET home page. */
router.get(
    '/features/:id/:name',
    function (req, res, next) {
      const flagName = req.params.name;
      const userId = req.params.id;

      return res.send({
          flagName,
          isEnabled: isEnabled(flagName, {
              userId,
          }),
      })
    });

module.exports = router;
