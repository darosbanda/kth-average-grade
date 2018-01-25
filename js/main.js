const letters = ['A', 'B', 'C', 'D', 'E']
const lookup = {A: 5, B: 4, C: 3, D: 2, E: 1}
const revLookup = {5: 'A', 4: 'B', 3: 'C', 2: 'D', 1 : 'E'}

const courses = $("#courselistresults .complete.course")
  .filter((index, element) => $(element).find(".grade")[0].innerText != 'P')
  .map((index, element) => {
    const credit = $(element).find(".credits")[0].innerText.replace(",", ".")
    const grade = $(element).find(".grade")[0].innerText
    return {grade: lookup[grade], credit: parseFloat(credit)}
  }).toArray()

const sums = courses.reduce((acc, course) => {
  const grades = acc.grades + (course.grade * course.credit)
  const credits = acc.credits + course.credit
  return {grades, credits}
}, {grades: 0.0, credits: 0.0})

const average = Math.round(sums.grades / sums.credits)
console.log(revLookup[average])

const tr = `
  <tr class="listingTrailer sum total">
    <td>
    </td>
    <td>
      Snittbetyg:
    </td>
    <td class="credits">
      ${revLookup[average]}&nbsp;
    </td>
    <td colspan="4">
    </td>
  </tr>
`

$("tfoot tr:last").after(tr)

