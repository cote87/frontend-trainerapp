import { BOTH, PERCENT, QUANTITY } from "./MetricMap";


export const ArgentinaTable = ({data,params}) => {

    let title=""
    switch (params) {
        case PERCENT:
            title="Porcentaje"
            break;
        case QUANTITY:
            title="Cantidad"
            break;
        case BOTH:
            title="Porcentaje(Cantidad)"
            break;
        default:
            break;
    }

  return (
    <div className="container mt-4">
      <table className="table transparent-table">
        <thead>
          <tr>
            <th>Provincia</th>         
            <th>{title}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([provincia, cantidad]) => (
            <tr key={provincia}>
              <td>{provincia}</td>
              <td>{cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};