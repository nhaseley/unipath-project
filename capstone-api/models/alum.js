const db = require('../db')




class Alum {


  /**
   * Convert a alum from the database into a alum object that can be viewed publically.
   * Don't show alum's password
   *
   *
   * @param {alum} alum - alum from database
   * @returns public alum
   */
  static createPublicalum(alum) {
    return {
      id: alum.id,
      email: alum.email,
      firstName: alum.first_name,
      lastName: alum.last_name,
      college: alum.college,
      collegeGradYear: alum.college_grad_year,
    };
  }





  /**
   * Get the names of all the colleges
   *
   * @param {*} 
   * @return colleges in the database 
   */
  static async getColleges() {
    const result = await db.query(
      `SELECT * FROM colleges_from_api`
    );
    return result.rows;
  }



}


module.exports = Alum