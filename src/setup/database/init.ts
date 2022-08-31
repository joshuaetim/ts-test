import User from "../../data/data-sources/sql/user-model";

const dbInit = () => {
    User.sync({alter: true}) 
}

export default dbInit