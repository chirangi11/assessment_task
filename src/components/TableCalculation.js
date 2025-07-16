import React, { useState } from 'react'

const data = [
    {
      label: "Electronics",
      value: 1500,
      children: [
        { label: "Phones", value: 800 },
        { label: "Laptops", value: 700 },
      ],
    },
    {
      label: "Furniture",
      value: 1000,
      children: [
        { label: "Tables", value: 300 },
        { label: "Chairs", value: 700 },
      ],
    },
  ];
const TableRow = ({ label, value, isChild, onAllocationClick, onChangeValue,numberValue,updatedValues,variancesValue,onAllocationValClick }) => (
    <tr key={label}>
        <td>{isChild ? `-- ${label}` : label}</td>
        <td>{updatedValues[label] ? updatedValues[label].toFixed(2) : value}</td>
        <td>
            <input type="number" placeholder="Input" onChange={(e) => onChangeValue(label, e.target.value)} value={numberValue[label] || ""}/>
        </td>
        <td>
            <button onClick={onAllocationClick}>button1</button>
        </td>
        <td>
            <button onClick={onAllocationValClick}>button2</button>
        </td>
        <td>{variancesValue[label] ? `${variancesValue[label]}%` : "0%"}</td>
    </tr>
  );
const TableCalculation = () => {
    const [numberValue, setNumberValue] = useState({})
    const [updatedValues, setUpdatedValues] = useState({});
    const [variancesValue, setVariancesValue] = useState({});
    
    const onChangeValue = (label,value) => {
        setNumberValue((prev) => ({ ...prev, [label]: value }))
    }

    const onAllocationClick = (label, originalValue) => {
        const inputPercent = parseFloat(numberValue[label]);
        if (!isNaN(inputPercent)) {
          const newValue = originalValue + (originalValue * inputPercent) / 100;
          setUpdatedValues((prev) => ({ ...prev, [label]: newValue }));
          setVariancesValue((prev) => ({ ...prev, [label]: inputPercent }));
        }
      };

      const onAllocationValClick = (label, originalValue) => {
        const newValue = parseFloat(numberValue[label]);
        if (!isNaN(newValue)) {
          const variance = ((newValue - originalValue) / originalValue) * 100;
          setUpdatedValues((prev) => ({ ...prev, [label]: newValue }));
          setVariancesValue((prev) => ({ ...prev, [label]: variance.toFixed(2) }));
        }
      };
    return (
        <div style={{ padding: "20px" }}>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Value</th>
                        <th>Input</th>
                        <th>Allocation %</th>
                        <th>Allocation Val</th>
                        <th>Variance %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <React.Fragment key={item.label}>
                            <TableRow 
                                label={item.label} 
                                value={item.value} 
                                isChild={false} 
                                onAllocationClick={onAllocationClick} 
                                onAllocationValClick={onAllocationValClick}
                                onChangeValue={onChangeValue} 
                                numberValue={numberValue}
                                updatedValues={updatedValues}
                                variancesValue={variancesValue}
                                />
                            {item.children.map((child) => (
                                <TableRow
                                    key={child.label}
                                    label={child.label}
                                    value={child.value}
                                    isChild={true}
                                    onAllocationClick={()=>{onAllocationClick(child.label, child.value)}}
                                    onAllocationValClick={()=>{onAllocationClick(child.label, child.value)}}
                                    onChangeValue={onChangeValue}
                                    numberValue={numberValue}
                                    updatedValues={updatedValues}
                                    variancesValue={variancesValue}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableCalculation
