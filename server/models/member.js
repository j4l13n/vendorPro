export default (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
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
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter vendor type'
      }
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: {
        args: true
      }
    },
    owner: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Vendor',
        key: 'id',
        as: 'owner'
      }
    }
  }, {});
  Member.associate = function(models) {
    // associations can be defined here
    Member.belongsTo(models.Vendor, {
      foreignKey: 'owner',
      onDelete: 'CASCADE'
    });
  };
  return Member;
};