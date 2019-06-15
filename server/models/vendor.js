export default (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter firstname'
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter lastname'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter email'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email'
        }

      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
      }
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: true,
      }
    }
  }, {});
  Vendor.associate = function(models) {
    // associations can be defined here
    Vendor.hasMany(models.Member, {
      foreignKey: 'owner'
    })
  };
  return Vendor;
};