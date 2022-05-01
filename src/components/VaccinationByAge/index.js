// Write your code here

import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {details} = props
  return (
    <div className="age-pie-container">
      <h1 className="age-pie-heading">Vaccination by age</h1>
      <PieChart height={300} width={1000}>
        <Pie cx="50%" cy="50%" outerRadius="70%" data={details} dataKey="count">
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64C2A6" />
        </Pie>
        <Legend
          iconType="cirle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontFamily: 'Roboto',
            fontSize: 12,
          }}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
