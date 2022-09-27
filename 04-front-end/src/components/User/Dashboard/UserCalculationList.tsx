import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import ICalculation from '../../../models/ICalculation.model';

export default function UserCalculationList(){
    const [ calculationList, setCalculationList ] = useState<ICalculation[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    interface CalculationListProps {
        calculation: ICalculation
    }

    function loadCalculationList(){
        api("get", "/api/calculation", "user")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                return setErrorMessage(apiResponse.data + "");
            }

            setCalculationList(apiResponse.data);
        });
    }



    useEffect(() => {
        loadCalculationList();
    }, []);

    function CalculationList(props: CalculationListProps){
        return (
            <tr>
                <td>{props.calculation.calculationId}</td>
                <td>{props.calculation.year}</td>
                <td>{props.calculation.monthId}</td>
                <td>{props.calculation.healthCare}</td>
                <td>{props.calculation.socialCare}</td>
                <td>{props.calculation.pio}</td>
                <td>{props.calculation.tax}</td>
                <td>{props.calculation.grossWorth}</td>
                <td>{props.calculation.netWorth}</td>
            </tr>
        );
    }

    return (
        <div>
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {calculationList && (
                <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th>Calculation no.</th>
                        <th>Year</th>
                        <th>Month</th>
                        <th>Health care</th>
                        <th>Social care</th>
                        <th>PIO</th>
                        <th>Tax</th>
                        <th>Gross worth</th>
                        <th>Net worth</th>
                    </tr>
                </thead>
                <tbody>
                    {calculationList.map(calculation => <CalculationList key={'calculation-row' + calculation.calculationId } calculation={calculation}/>)}
                </tbody>
                <tfoot>
                    <tr>
                        <td>ID</td>
                        <td>Year</td>
                        <td>Month</td>
                        <td>Health care</td>
                        <td>Social care</td>
                        <td>PIO</td>
                        <td>Tax</td>
                        <td>Gross worth</td>
                        <td>Net worth</td>
                    </tr>
                    </tfoot>
            </table>
            )}
        </div>
    );
}