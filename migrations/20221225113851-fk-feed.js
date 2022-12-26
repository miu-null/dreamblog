"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // 게시글 작성자가 누구인지 userId 외래키의 제약조건
        await queryInterface.addConstraint("Feeds", {
            fields: ["userId"], // 어느 컬럼에 제약조건을 걸건지
            type: "foreign key", // 제약조건의 타입
            name: "Users_Feeds_userId_fk", // 제약조건 이름
            references: {
                // 이 외래키가 어디를 참조하는지
                table: "Users",
                field: "userId",
            },
            onDelete: "cascade", // 참조하는 놈이 뒤지면 얘도 뒤진다
            onUpdate: "cascade", // 참조하는 놈이 수정되면 얘도 수정된다
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
        테이블이 잘못 만들어졌을 때 위의 up에 쓰인 것들을
        간단히 명령어로 롤백할 수 있도록 만드는 코드        
        */
        await queryInterface.removeConstraint("Feeds", "Users_Feeds_userId_fk");
    },
};
