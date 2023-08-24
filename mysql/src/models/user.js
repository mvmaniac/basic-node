const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE, // DATETIME
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false, // true로 하면 createdAt, updatedAt이 자동으로 생겨지고 자동으로 값도 넣어줌
        underscored: false, // 언더스코어 문법으로 컬럼 생성 여부
        paranoid: false, // true로 하면 deleteAt이 자동으로 생겨지고 삭제 할 경우 true로 변경해줌
        modelName: 'User',
        tableName: 'users', // 모델 이름을 기준으로 복수형으로 자동으로 생성됨?
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};
