// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {details} = props
  return (
    <div className="gender-pie-container">
      <h1 className="gender-pie-heading">Vaccination by gender</h1>
      <PieChart height={300} width={1000}>
        <Pie
          data={details}
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
          startAngle={180}
          endAngle={0}
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
