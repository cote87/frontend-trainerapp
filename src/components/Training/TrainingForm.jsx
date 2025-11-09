import { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { TiptapEditor } from './TipTapEditor';
import { ThematicContext } from '../../context/Thematic/ThematicContex';
import { TrainingContext } from '../../context/Training/TrainingContext';
import { useNavigate, useParams } from 'react-router-dom';
import { TrainerContext } from '../../context/Trainer/TrainerContext';
import { HYBRID, ONLINE, ONSITE } from '../../hooks/useTrainings';
import Swal from 'sweetalert2';

export const TrainingForm = () => {
  const { thematicList: thematics, handlerLoadingThematicsList } = useContext(ThematicContext);
  const { currentTraining, handlerLoadingTraining, handlerSaveTraining, handlerClearCurrentTraining } = useContext(TrainingContext);
  const { provinces, handlerLoadingProvinces } = useContext(TrainerContext);

  const { id = 0} = useParams();

  const [training, setTraining] = useState({
    title: '',
    startDate: '',
    mode: '',
    organizer: '',
    province: null,
    thematic: null,
    description: ''
  });


  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [thematicId, setThematicId] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [errors, setErrors] = useState({});

  // Cargar datos al montar
  useEffect(() => {
    handlerLoadingProvinces();
    handlerLoadingThematicsList();
    if (id) {
      handlerClearCurrentTraining();
      handlerLoadingTraining(id);
    } else {
      handlerClearCurrentTraining();
    }
  }, [id]);

  // Actualizar estados cuando currentTraining cambie
  useEffect(() => {
    if (currentTraining) {
      setTraining({
        title: currentTraining.title || '',
        startDate: currentTraining.startDate || '',
        mode: currentTraining.mode || '',
        organizer: currentTraining.organizer || '',
      });
      setContent(currentTraining.description || '');
      setThematicId(currentTraining.thematic?.id || '');
      setProvinceId(currentTraining.province?.id || '');
    }
  }, [currentTraining]);


  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setTraining({
      ...training,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.length > 10000) {
      setErrors({ description: "El contenido excede el límite de 10.000 caracteres." });
      return;
    }

    const data = {
      ...training,
      description: content,
      thematic: thematicId ? { id: thematicId } : null,
      province: provinceId ? { id: provinceId } : null,
      id: id,
    };

    try {
      await handlerSaveTraining(data);
      setErrors({}); // limpiar errores si todo va bien

      // Mostrar mensaje de éxito
      await Swal.fire({
        icon: 'success',
        title: '¡Capacitación guardada!',
        text: `La capacitación "${training.title}" se guardó correctamente.`,
        confirmButtonText: 'Aceptar'
      });

      // Redirigir al listado de capacitaciones
      navigate('/capacitaciones');

    } catch (err) {
      console.error("Errores de validación:", err);
      setErrors(err); // mostrar errores de backend
    }
  };

  return (
    <Container className="mt-5 my-2">
      <h2 className="mb-4 text-white">{id ? "Editar" : "Crear"} capacitación</h2>
      <Form onSubmit={handleSubmit}>
        {/* Título */}
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el título"
            name="title"
            value={training.title || ''}
            onChange={onInputChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Provincia */}
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Provincia</Form.Label>
          <Form.Select
            value={provinceId}
            onChange={e => setProvinceId(e.target.value)}
            isInvalid={!!errors.province}
          >
            <option value="">Seleccione una opción</option>
            {provinces && provinces.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.province}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Fecha de inicio */}
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Fecha de inicio</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={training.startDate || ''}
            onChange={onInputChange}
            isInvalid={!!errors.startDate}
          />
          <Form.Control.Feedback type="invalid">
            {errors.startDate}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Modalidad */}
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Modalidad</Form.Label>
          <Form.Select
            value={training.mode}
            onChange={e => setTraining({ ...training, mode: e.target.value })}
            isInvalid={!!errors.mode}
          >
            <option key={0}>Seleccione una opción</option>
            <option key={1} value={ONSITE}>Presencial</option>
            <option key={2} value={ONLINE}>Online</option>
            <option key={3} value={HYBRID}>Presencial+Online</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.mode}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Formador */}
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Organizado por</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del formador"
            name="organizer"
            value={training.organizer || ''}
            onChange={onInputChange}
            isInvalid={!!errors.organizer}
          />
          <Form.Control.Feedback type="invalid">
            {errors.organizer}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Temática */}
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Temática</Form.Label>
          <Form.Select
            value={thematicId}
            onChange={e => setThematicId(e.target.value)}
            isInvalid={!!errors.thematic}
          >
            <option value="">Seleccione una opción</option>
            {thematics && thematics.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.thematic}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Descripción */}
        <Form.Group className="mb-3">
          <Form.Label className='text-white'>Descripción</Form.Label>
          {(content !== '' || id == 0) && <TiptapEditor content={content} setContent={setContent} />}
          {errors.description && (
            <div className="text-danger mt-1">{errors.description}</div>
          )}
        </Form.Group>

        <Row>
          <Col>
            <p className="text-start text-white">Máximo 10.000 caracteres.</p>
          </Col>
          <Col className='text-end'>
            <Button variant="primary" type="submit" className='btn-azul-oscuro border border-white my-2'>
              Guardar capacitación
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
