import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/layout/NavBar";
import { TrainerProvider } from "../context/Trainer/TrainerProvider";
import { TrainerListPage } from "../pages/TrainersListPage";
import { ThematicListPage } from "../pages/ThematicListPage";
import { ThematicProvider } from "../context/Thematic/ThematicProvider";
import { UserListPage } from "../pages/UserListPage";
import { UserProvider } from "../context/User/UserProvider";
import { AuthContext } from "../auth/context/AuthContext";
import { useContext } from "react";
import { Profile } from "../auth/pages/Profile";
import { MetricMap } from "../pages/Metrics/MetricMap";
import { HomePage } from "../pages/HomePage";
import { TrainingsListPage } from "../pages/TrainingsListPage";
import { TrainingForm } from "../components/Training/TrainingForm";
import { TrainingProvider } from "../context/Training/TrainingProvider";
import { TrainingView } from "../components/Training/TrainingView";
import { ProfileForm } from "../auth/pages/ProfileForm";

export const TrainerAppRoutes = () => {

    const {
        login
    } = useContext(AuthContext);

    return (<div
        style={{
            width: '100%',
            backgroundImage: "url('/img/bg.png')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
        }}
    >
        <NavBar />
        <TrainerProvider>
            <UserProvider>
                <TrainingProvider>
                    <ThematicProvider>
                        <Routes>
                            <Route path="/*" element={<Navigate to="/homepage" />} />
                            <Route path="capacitaciones/form" element={<TrainingForm />} />
                            <Route path="capacitaciones/form/:id" element={<TrainingForm />} />
                            <Route path="capacitaciones/view" element={<TrainingView />} />
                            <Route path="capacitaciones" element={<TrainingsListPage />} />
                            <Route path="homepage" element={<HomePage />} />
                            <Route path="perfil" element={<Profile />} />
                            <Route path="editarPerfil" element={<ProfileForm />} />
                            <Route path="metrics/map" element={<MetricMap></MetricMap>} />
                            {login.user.authorities.includes("KEY_READ_TRAINERS") && <Route path="formadores" element={<TrainerListPage />} />}
                            {login.user.authorities.includes("KEY_READ_THEMATICS") && <Route path="tematicas" element={<ThematicListPage />} />}
                            {login.user.authorities.includes("KEY_READ_USERS") && <Route path="usuarios" element={<UserListPage />} />}
                        </Routes>
                    </ThematicProvider>
                </TrainingProvider>
            </UserProvider>
        </TrainerProvider>
        <footer className="bg-secondary text-white text-center py-3">
            <h5>Ministerio de Seguridad Nacional | Red de Formadores y Capacitaciones en Seguridad</h5>
        </footer>
    </div>);
}