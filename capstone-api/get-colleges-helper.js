const axios = require("axios");
const db = require("./db");

const apiKey = "AiIF47OdjlHUb8m7mvs5k265lBQgGG9Hd5KXhBrF";
const ORIGINAL_COLLEGE_API_URL =
  "https://api.data.gov/ed/collegescorecard/v1/schools";

async function callStoreResultWithDelay() {
  for (let pageID = 0; pageID < 6543; pageID++) {
    const createEndpointUrl = (pageID) =>
      `${ORIGINAL_COLLEGE_API_URL}?page=${pageID}&api_key=${apiKey}`;

    if (pageID % 6 === 0) {
      console.log(`Wait in here before page: ${pageID}`);
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 1 minute
      console.log("Waiting done. Moving to page:", pageID);
    }

    try {
      const response = await axios.get(createEndpointUrl(pageID));
      for (let result = 0; result < 20; result++) {
        storeResult(response.data.results[result].latest);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    console.log(`Completed page: ${pageID}`);
  }

}

callStoreResultWithDelay();
/**
 * Get the names of all the colleges a given user has liked in the past
 *
 * @param {*} student_id
 * @return colleges in the database for a given user
 */
async function storeResult(collegeInfo) {
  const result = await db.query(
    `INSERT INTO colleges_from_api (
        zip,
        city,
        name,
        state,
        men_only,
        school_url,
        women_only,
        price_calculator,
        sat_score_critical_reading,
        sat_score_writing,
        sat_score_math,
        act_score,
        admission_rate,
        aanipi,
        annh,
        hispanic,
        historically_black,
        predominantly_black,
        tribal,
        size,
        avg_family_income,
        dependent,
        aian_faculty,
        asian_faculty,
        black_faculty,
        hispanic_faculty,
        nhpi_faculty,
        two_or_more_faculty,
        unknown_faculty,
        white_faculty,
        non_resident_faculty,
        first_generation,
        median_family_income,
        aian_students,
        asian_students,
        black_students,
        hispanic_students,
        nhpi_students,
        two_or_more_students,
        unknown_students,
        white_students,
        non_resident_students,
        student_faculty_ratio, 
        retention_rate,
        firstgen_parents_hs,
        firstgen_parents_ms,
        firstgen_parents_college,
        avg_net_price_private,
        avg_net_price_public,
        net_price_0_30000,
        net_price_30001_48000,
        net_price_48001_75000,
        net_price_75001_111000,
        net_price_111001_plus,
        room_board_offcampus,
        tuition_in_state,
        tuition_out_of_State,
        earnings_1yr_after_completion,
        earnings_4yr_after_completion
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59)
      RETURNING 
      zip,
      city,
      name,
      state,
      men_only,
      school_url,
      women_only,
      price_calculator,
      sat_score_critical_reading,
      sat_score_writing,
      sat_score_math,
      act_score,
      admission_rate,
      aanipi,
      annh,
      hispanic,
      historically_black,
      predominantly_black,
      tribal,
      size,
      avg_family_income,
      dependent,
      aian_faculty,
      asian_faculty,
      black_faculty,
      hispanic_faculty,
      nhpi_faculty,
      two_or_more_faculty,
      unknown_faculty,
      white_faculty,
      non_resident_faculty,
      first_generation,
      median_family_income,
      aian_students,
      asian_students,
      black_students,
      hispanic_students,
      nhpi_students,
      two_or_more_students,
      unknown_students,
      white_students,
      non_resident_students,
      student_faculty_ratio, 
      retention_rate,
      firstgen_parents_hs,
      firstgen_parents_ms,
      firstgen_parents_college,
      avg_net_price_private,
      avg_net_price_public,
      net_price_0_30000,
      net_price_30001_48000,
      net_price_48001_75000,
      net_price_75001_111000,
      net_price_111001_plus,
      room_board_offcampus,
      tuition_in_state,
      tuition_out_of_State,
      earnings_1yr_after_completion,
      earnings_4yr_after_completion
                `,
    [
      collegeInfo.school.zip,
      collegeInfo.school.city,
      collegeInfo.school.name,
      collegeInfo.school.state,
      collegeInfo.school.men_only,
      collegeInfo.school.school_url,
      collegeInfo.school.women_only,
      collegeInfo.school.price_calculator_url,
      collegeInfo.admissions.sat_scores.midpoint.critical_reading,
      collegeInfo.admissions.sat_scores.midpoint.writing,
      collegeInfo.admissions.sat_scores.midpoint.math,
      collegeInfo.admissions.act_scores.midpoint.cumulative,
      collegeInfo.admissions.admission_rate.overall,
      collegeInfo.school.minority_serving.aanipi,
      collegeInfo.school.minority_serving.annh,
      collegeInfo.school.minority_serving.hispanic,
      collegeInfo.school.minority_serving.historically_black,
      collegeInfo.school.minority_serving.predominantly_black,
      collegeInfo.school.minority_serving.tribal,
      collegeInfo.student.size,
      collegeInfo.student.demographics.avg_family_income,
      collegeInfo.student.demographics.dependent,
      collegeInfo.student.demographics.faculty.race_ethnicity.aian,
      collegeInfo.student.demographics.faculty.race_ethnicity.asian,
      collegeInfo.student.demographics.faculty.race_ethnicity.black,
      collegeInfo.student.demographics.faculty.race_ethnicity.hispanic,
      collegeInfo.student.demographics.faculty.race_ethnicity.nhpi,
      collegeInfo.student.demographics.faculty.race_ethnicity.two_or_more,
      collegeInfo.student.demographics.faculty.race_ethnicity.unknown,
      collegeInfo.student.demographics.faculty.race_ethnicity.white,
      collegeInfo.student.demographics.faculty.race_ethnicity.nonresident,
      collegeInfo.student.demographics.first_generation,
      collegeInfo.student.demographics.median_family_income,
      collegeInfo.student.demographics.race_ethnicity.aian,
      collegeInfo.student.demographics.race_ethnicity.asian,
      collegeInfo.student.demographics.race_ethnicity.black,
      collegeInfo.student.demographics.race_ethnicity.hispanic,
      collegeInfo.student.demographics.race_ethnicity.nhpi,
      collegeInfo.student.demographics.race_ethnicity.two_or_more,
      collegeInfo.student.demographics.race_ethnicity.unknown,
      collegeInfo.student.demographics.race_ethnicity.white,
      collegeInfo.student.demographics.race_ethnicity.non_resident_alien,
      collegeInfo.student.demographics.student_faculty_ratio,
      collegeInfo.student.retention_rate.overall.full_time,
      collegeInfo.student.share_firstgeneration_parents.highschool,
      collegeInfo.student.share_firstgeneration_parents.middleschool,
      collegeInfo.student.share_firstgeneration_parents.somecollege,
      collegeInfo.cost.avg_net_price.private,
      collegeInfo.cost.avg_net_price.public,
      collegeInfo.cost.net_price.consumer.by_income_level["0-30000"],
      collegeInfo.cost.net_price.consumer.by_income_level["30001-48000"],
      collegeInfo.cost.net_price.consumer.by_income_level["48001-75000"],
      collegeInfo.cost.net_price.consumer.by_income_level["750001-111000"],
      collegeInfo.cost.net_price.consumer.by_income_level["111000-plus"],
      collegeInfo.cost.roomboard.offcampus,
      collegeInfo.cost.tuition.in_state,
      collegeInfo.cost.tuition.out_of_state,
      collegeInfo.earnings["1_yr_after_completion"].median,
      collegeInfo.earnings["4_yrs_after_completion"].median,
      // collegeInfo.programs.cip_4_digit
    ]
  );
  return result.rows;
}
