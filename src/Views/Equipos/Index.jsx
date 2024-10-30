import React, { useEffect, useState, useRef } from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import DivSelect from '../../Components/DivSelect';
import DivInput from '../../Components/DivInput';
import Modal from '../../Components/Modal';
import { confirmation, sendRequest } from '../../functions';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [ram, setRam] = useState('');
  const [procesador, setProcesador] = useState('');
  const [graficos, setGraficos] = useState('');
  const [monitor, setMonitor] = useState('');
  const [hd, setHd] = useState('');
  const [image_path, setImagePath] = useState('');
  const [operation, setOperation] = useState('');
  const [title, setTitle] = useState('');
  const [marca_id, setMarcaId] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('d-none');
  const [rows, setRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const NameInput = useRef();
  const close = useRef();
  let method = '';
  let url = '';

  useEffect(() => {
    getEquipos(1);
    getMarcas();
  }, []);

  const getEquipos = async (page) => {
    const res = await sendRequest('GET', '/api/equipos?page=' + page, '');
    setEquipos(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable('');
    setClassLoad('d-none');
  };

  const getMarcas = async () => {
    const res = await sendRequest('GET', '', '/api/marcas', '');
    setMarcas(res);
  };

  const deleteEquipo = (id, name) => {
    confirmation(name, '/api/equipos/' + id, 'equipos');
  };

  const clear = () => {
    setName('');
    setRam('');
    setProcesador('');
    setGraficos('');
    setMonitor('');
    setHd('');
    setImagePath('');
  };

  const openModal = (op, n, r, p, g, m, h, im, eq) => {
    clear();
    setTimeout(() => NameInput.current.focus(), 600);
    setOperation(op);
    setId(eq);
    if (op === 1) {
      setTitle('Create Equipment');
    } else {
      setTitle('Update Equipment');
      setName(n);
      setRam(r);
      setProcesador(p);
      setGraficos(g);
      setMonitor(m);
      setHd(h);
      setImagePath(im);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (operation === 1) {
      method = 'POST';
      url = '/api/equipos';
    } else {
      method = 'PUT';
      url = '/api/equipos/' + id;
    }
    const form = { name, ram, procesador, graficos, monitor, hd, image_path, marca_id };
    const res = await sendRequest(method, form, url, '');

    if (res.status === true) {
      clear();
      getEquipos(page);
      setTimeout(() => NameInput.current.focus(), 3000);
      close.current.click(); // Close modal on success
    }
  };

  const goPage = (pa) => {
    setPage(pa);
    getEquipos(pa);
  };

  return (
    <div className='container-fluid'>
      <DivAdd>
        <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalEquipos' onClick={() => openModal(1)}>
          <i className='fa-solid fa-circle-plus'></i> Add
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>RAM</th>
              <th>Processor</th>
              <th>Graphics</th>
              <th>Monitor</th>
              <th>HD</th>
              <th>Image</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {equipos.map((row, i) => (
              <tr key={row.id}>
                <td>{i + 1}</td>
                <td>{row.name}</td>
                <td>{row.ram}</td>
                <td>{row.procesador}</td>
                <td>{row.graficos}</td>
                <td>{row.monitor}</td>
                <td>{row.hd}</td>
                <td><img src={row.image_path} alt={row.name} style={{ width: '50px', height: 'auto' }} /></td>
                <td>
                  <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalEquipos' onClick={() => openModal(2, row.name, row.ram, row.procesador, row.graficos, row.monitor, row.hd, row.image_path, row.id)}>
                    <i className='fa-solid fa-edit'></i>
                  </button>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => deleteEquipo(row.id, row.name)}>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationControl changePage={page => goPage(page)} next={true} limit={pageSize} page={page} total={rows} />
      </DivTable>
      <Modal title={title} modal='modalEquipos'>
        <div className='modal-body'>
          <form onSubmit={save}>
            <DivInput
              type="text"
              icon="fa-cogs"
              value={name}
              className="form-control"
              placeholder="Name"
              required
              ref={NameInput}
              handleChange={(e) => setName(e.target.value)}
            />
            <DivInput
              type="text"
              icon="fa-memory"
              value={ram}
              className="form-control"
              placeholder="RAM"
              required
              handleChange={(e) => setRam(e.target.value)}
            />
            <DivInput
              type="text"
              icon="fa-microchip"
              value={procesador}
              className="form-control"
              placeholder="Processor"
              required
              handleChange={(e) => setProcesador(e.target.value)}
            />
            <DivInput
              type="text"
              icon="fa-video"
              value={graficos}
              className="form-control"
              placeholder="Graphics"
              required
              handleChange={(e) => setGraficos(e.target.value)}
            />
            <DivInput
              type="text"
              icon="fa-desktop"
              value={monitor}
              className="form-control"
              placeholder="Monitor"
              required
              handleChange={(e) => setMonitor(e.target.value)}
            />
            <DivInput
              type="text"
              icon="fa-hdd"
              value={hd}
              className="form-control"
              placeholder="HD"
              required
              handleChange={(e) => setHd(e.target.value)}
            />
            <DivInput
              type="file"
              icon="fa-image"
              className="form-control-file"
              placeholder="Image"
              handleChange={(e) => setImagePath(e.target.value)}
            />
            <DivSelect
              icon="fa-list"
              required
              value={marca_id}
              className="form-select"
              options={marcas}
              handleChange={(e) => setMarcaId(e.target.value)}
            />
            <div className='d-grid col-10 mx-auto mt-3'>
              <button className='btn btn-success'>
                <i className='fa-solid fa-save'></i> Save
              </button>
            </div>
          </form>
        </div>
        <div className='modal-footer'>
          <button className='btn btn-dark' data-bs-dismiss='modal' ref={close}> Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Equipos;
