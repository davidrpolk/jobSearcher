const Sequelize = require('sequelize');

const sequelize = new Sequelize("jobSearch", "root", "",
  {
    host: "localhost",
    dialect: 'mysql',
  });

const Jobs = sequelize.define('jobs', {
  // attributes
  company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  // options
});

const Outreach = sequelize.define('outreach', {
  company_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Jobs,
      key: 'id'
    }
  },
  dateApplied: {
    type: Sequelize.DATE,
    allowNull: false
  },
  dateOfLastEmail: {
    type: Sequelize.DATE,
  }, 
  replyReceived: {
    type: Sequelize.STRING,
  }
})

const PhoneScreen = sequelize.define('phoneScreen', {
  company_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Jobs,
      key: 'id'
    }
  },
  scheduledOrCompleted: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  lastFollowUp: { 
    type: Sequelize.DATE
  },
  replyReceived: {
    type: Sequelize.STRING
  }
})

const CodingChallenge = sequelize.define('codingChallenge', {
  company_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Jobs,
      key: 'id'
    }
  },
  dateReceived: {
    type: Sequelize.DATE,
    allowNull: false
  },
  dateSubmitted: {
    type: Sequelize.DATE
  },
  lastFollowUp: { 
    type: Sequelize.DATE
  },
  replyReceived: {
    type: Sequelize.STRING
  }
})

const OnSite = sequelize.define('onSite', {
  company_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Jobs,
      key: 'id'
    }
  },
  scheduledOrCompleted: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  lastFollowUp: { 
    type: Sequelize.DATE
  },
  replyReceived: {
    type: Sequelize.STRING
  }
})

const Offer = sequelize.define('offer', {
  company_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Jobs,
      key: 'id'
    }
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  length: {
    type: Sequelize.STRING
  },
  initialComp: {
    type: Sequelize.INTEGER
  },
  finalComp: {
    type: Sequelize.INTEGER
  },
  negotiated: {
    type: Sequelize.BOOLEAN
  },
  accepted: {
    type: Sequelize.BOOLEAN
  }
})

sequelize.sync();

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = {
  Jobs,
  Outreach,
  PhoneScreen,
  CodingChallenge,
  OnSite,
  Offer
};