import React, { useState, useEffect } from 'react';
import { Container, Typography ,TextField, Button,Collapse ,Box, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { MailOutline, LockOutlined, Delete, Add } from '@mui/icons-material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ButtonBase from '@mui/material/ButtonBase';
import ModifyLevel from './ModifyLevel';
import ModifyStudent from './ModifyStudent';
import { styled } from '@mui/material/styles';
import ModifyProfessor from './ModifyProfessor';

import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const SettingsPage = () => {
    const [professorData, setProfessorData] = useState({
        id: '',
        departmentId: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const [newProfessorPassword, setNewProfessorPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [confirmationText, setConfirmationText] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogFeild, setOpenDialogFeild] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [newFiliereAbbreviation, setNewFiliereAbbreviation] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [showImportations, setShowImportations] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const [openModifyLevel, setOpenModifyLevel] = useState(false);
    const [openModifyStudent, setOpenModifyStudent] = useState(false);
    const [openModifyProfessor, setOpenModifyProfessor] = useState(false);


    const handleOpenModifyLevel = () => {
        setOpenModifyLevel(true);
    };

    const handleOpenModifyStudent = () => {
        setOpenModifyStudent(true);
    };
    const handleCloseModifyLevel = () => {
        setOpenModifyLevel(false);
    };

    const handleCloseModifyStudent = () => {
        setOpenModifyStudent(false);
    };
    const handleCloseModifyProfessor = () => {
        setOpenModifyProfessor(false);
    };

    const handleOpenModifyProfessor = () => {
        setOpenModifyProfessor(true);
    };
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            handleImportModules(file); 
        }
    };

    const handleImportModules = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        console.log('FormData:', formData.get('file')); // Verify that the file is correctly added to FormData

        axios.post(`${process.env.REACT_APP_SPRING_BASE_URL}/api/modules/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set the correct content type for file uploads
            }
        })
        .then((response) => {
            console.log('Modules uploaded:', response.data);
            setSelectedFile(null);
            setSnackbarSeverity('success');
            setSnackbarMessage('fichier importé avec succés');
            setOpenSnackbar(true);
        })
        .catch((error) => {
            console.error('Upload error:', error); // Add this line to see complete error details
            const errorMessage = error.response?.data?.message || 'An error occurred during file upload';
            setSnackbarSeverity('error');
            setSnackbarMessage(errorMessage);
            setOpenSnackbar(true);
        });
    };

    const handleProfessorFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            handleImportProfessor(file); // Directly call the upload function with the selected file
        }
    };

    const handleImportProfessor = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        console.log('FormData:', formData.get('file')); // Verify that the file is correctly added to FormData

        axios.post(`${process.env.REACT_APP_SPRING_BASE_URL}/api/professors/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set the correct content type for file uploads
            }
        })
        .then((response) => {
            console.log('Modules uploaded:', response.data);
            setSelectedFile(null);
            setSnackbarSeverity('success');
            setSnackbarMessage('fichier importé avec succés');
            setOpenSnackbar(true);
        })
        .catch((error) => {
            console.error('Upload error:', error); // Add this line to see complete error details
            const errorMessage = error.response?.data?.message || 'An error occurred during file upload';
            setSnackbarSeverity('error');
            setSnackbarMessage(errorMessage);
            setOpenSnackbar(true);
        });
    };
    
    const handleFileSouhaitsChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            handleImportSouhaits(file); // Directly call the upload function with the selected file
        }
    };
    
    const handleImportSouhaits = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        console.log('FormData:', formData.get('file')); // Verify that the file is correctly added to FormData

        axios.post(`${process.env.REACT_APP_SPRING_BASE_URL}/api/modules/uploadRespo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set the correct content type for file uploads
            }
        })
        .then((response) => {
            console.log('Modules uploaded:', response.data);
            setSelectedFile(null);
            setSnackbarSeverity('success');
            setSnackbarMessage('fichier importé avec succés');
            setOpenSnackbar(true);
        })
        .catch((error) => {
            console.error('Upload error:', error); // Add this line to see complete error details
            const errorMessage = error.response?.data?.message || 'An error occurred during file upload';
            setSnackbarSeverity('error');
            setSnackbarMessage(errorMessage);
            setOpenSnackbar(true);
        });
    };
    
    
    
    useEffect(() => {
        fetchProfessorData();
    }, []);

    const fetchProfessorData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const tokenParts = token.split('.');
                const tokenPayload = JSON.parse(atob(tokenParts[1]));
                const { id, departmentId, firstName, lastName, sub: email } = tokenPayload;
                setProfessorData({ id, departmentId, firstName, lastName, email });
            } else {
                throw new Error('Token not found in localStorage');
            }
        } catch (error) {
            console.error('Error fetching professor data:', error);
            navigate('/login');
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handlePasswordChange = (event) => {
        setNewProfessorPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleResetPasswordChange = (event) => {
        setResetPassword(event.target.value);
    };

    const handleConfirmationTextChange = (event) => {
        setConfirmationText(event.target.value);
    };

    const openResetDialog = () => {
        setOpenDialog(true);
    };

    const closeResetDialog = () => {
        setOpenDialog(false);
        setConfirmationText('');
        setResetPassword('');
    };

    const closeResetDialogFeild = () => {
        setOpenDialogFeild(false);
    };

    const handleEmailUpdate = async () => {
        try {
            const { id, email: currentEmail } = professorData;
            const newEmail = professorData.email;

            if (!newEmail) {
                throw new Error("L'e-mail est requis.");
            }

            const updatedProfessor = { id, email: newEmail };

            await axios.put(`${process.env.REACT_APP_SPRING_BASE_URL}/api/professors/${id}/email`, updatedProfessor);

            setSnackbarSeverity('success');
            setSnackbarMessage('E-mail mis à jour avec succès.');
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'e-mail :", error);
            let errorMessage = "Erreur lors de la mise à jour de l'e-mail !";
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message || errorMessage;
            }
            setSnackbarSeverity('error');
            setSnackbarMessage(errorMessage);
            setOpenSnackbar(true);
        }
    };

    const handlePasswordUpdate = async () => {
        try {
            const { id } = professorData;

            if (!newProfessorPassword) {
                throw new Error('Le mot de passe est requis.');
            }

            if (newProfessorPassword !== confirmPassword) {
                throw new Error('Les mots de passe ne correspondent pas.');
            }

            const updatedProfessor = { id, password: newProfessorPassword };

            await axios.put(`${process.env.REACT_APP_SPRING_BASE_URL}/api/professors/${id}/password`, updatedProfessor);

            setSnackbarSeverity('success');
            setSnackbarMessage('Mot de passe mis à jour avec succès.');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe :', error);
            let errorMessage = 'Erreur lors de la mise à jour du mot de passe !';
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message || errorMessage;
            }
            setSnackbarSeverity('error');
            setSnackbarMessage(errorMessage);
            setOpenSnackbar(true);
        } finally {
            setNewProfessorPassword('');
            setConfirmPassword('');
        }
    };

    const handleResetData = async () => {
        try {
            if (confirmationText.trim().toLowerCase() !== 'je confirme la réinitialisation') {
                throw new Error('Le texte de confirmation est incorrect.');
            }

            if (!resetPassword) {
                throw new Error('Le mot de passe est requis.');
            }

            const response = await axios.post(`${process.env.REACT_APP_SPRING_BASE_URL}/api/auth/confirm-password`, {
                email: professorData.email,
                password: resetPassword,
            });

            if (response.data === 'Password confirmed successfully.') {
                const deleteSessionsResponse = await axios.delete(`${process.env.REACT_APP_SPRING_BASE_URL}/api/session/deleteAll`);
                const deleteStudentsResponse = await axios.delete(`${process.env.REACT_APP_SPRING_BASE_URL}/api/students/deleteAll`);

                if (deleteSessionsResponse.status === 200 && deleteStudentsResponse.status === 200) {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Réinitialisation effectuée avec succès.');
                } else {
                    throw new Error('Erreur lors de la suppression des sessions ou des étudiants.');
                }
            } else {
                setSnackbarSeverity('error');
                setSnackbarMessage('Mot de passe invalide.');
            }
        } catch (error) {
            console.error('Erreur lors de la réinitialisation :', error);

            let errorMessage = error.response?.data?.error || error.message || 'Erreur lors de la réinitialisation !';

            if (typeof errorMessage !== 'string') {
                errorMessage = 'Une erreur inattendue est survenue.';
            }

            setSnackbarSeverity('error');
            setSnackbarMessage(errorMessage);
        } finally {
            setOpenSnackbar(true);
            setOpenDialog(false);
            setConfirmationText('');
            setResetPassword('');
        }
    };

    const handleAddFiliere = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SPRING_BASE_URL}/api/levels/createFiliere`, newFiliereAbbreviation ,{
                headers: {
                    'Content-Type': 'text/plain'
                  }
            });
            closeResetDialogFeild();
            setSnackbarSeverity('success');
            setSnackbarMessage('Filière ajoutée avec succès.');
            setOpenSnackbar(true);
            setNewFiliereAbbreviation('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la filière :', error);
            let errorMessage = 'Erreur lors de l\'ajout de la filière !';
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message || errorMessage;
            }
            setSnackbarSeverity('error');
            setSnackbarMessage(errorMessage);
            setOpenSnackbar(true);
        }
    };

    return (
        <Container mb={10}>
            <Typography mt={3} mb={2} variant="h1" gutterBottom>Paramètres</Typography>
            <Tabs
                value={tabValue}
                onChange={(event, newValue) => setTabValue(newValue)}
                textColor="primary"
                indicatorColor="primary"
                centered
                variant="fullWidth"
                sx={{ mb: 4 }}
            >
                <Tab icon={<PersonIcon />} label="Données personnelles" />
                <Tab icon={<SettingsIcon />} label="Gestion des ressources " />
            </Tabs>

            {tabValue === 0 && (
                <Box mb={4}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <MailOutline sx={{ mr: 1 }} />
                        <Typography variant="h3">Changer l'email</Typography>
                    </Box>
                    <TextField
                        label="Nouvelle adresse e-mail"
                        type="email"
                        value={professorData.email}
                        onChange={(e) => setProfessorData({ ...professorData, email: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleEmailUpdate} sx={{ mt: 2 }}>
                        Confirmer le nouvel email
                    </Button>

                    <Box display="flex" alignItems="center" mt={4} mb={2}>
                        <LockOutlined sx={{ mr: 1 }} />
                        <Typography variant="h3">Changer le mot de passe</Typography>
                    </Box>
                    <TextField
                        label="Nouveau mot de passe"
                        type="password"
                        value={newProfessorPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Confirmer le mot de passe"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handlePasswordUpdate} sx={{ mt: 2 }}>
                        Confirmer le nouveau mot de passe
                    </Button>
                </Box>
            )}

            {tabValue === 1 && (

                
                <Box mb={4}>
    

                  <Box display="flex" alignItems="center" mt={4} mb={2} onClick={() => setShowImportations(!showImportations)}>
                  <StorageIcon sx={{ mr: 1 }} />
                  <ButtonBase>
    <Typography variant="h3">Importation des ressources</Typography>
  </ButtonBase>                    </Box>
                    <Typography variant="subtitle1" mb={2}>
                    Utilisez cette section pour importer les modules et les professeurs par département, gérer les affectations des enseignants aux modules, et ajouter de nouvelles filières à votre système académique.
                    </Typography>
                  




                <Collapse in={showImportations}>


                    <Box display="flex" alignItems="center" mb={2} sx={{ marginLeft: 1 }}>
                        <MenuBookIcon sx={{ mr: 1 }} />
                        <Typography variant="h4">Importer les modules via excel</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>

                    <input
                type="file"
                style={{ display: 'none' }}
                id="upload-file-input"
                onChange={handleFileChange}
            />
            
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                htmlFor="upload-file-input"
                sx={{ marginLeft: 6 }}

            >
                Upload file
            </Button>
            </Box>

            <Box display="flex" alignItems="center" mb={2}  sx={{ marginLeft: 1 }}            >
                        <PersonAddAltIcon sx={{ mr: 1 }} />
                        <Typography variant="h4">Importer les professeurs via excel</Typography>
            </Box>
                    <Box display="flex" alignItems="center" mb={2}>

                    <input
                type="file"
                style={{ display: 'none' }}
                id="upload-file-professor-input"
                onChange={handleProfessorFileChange}
            />
            
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                htmlFor="upload-file-professor-input"
                sx={{ marginLeft: 6 }}
            >
                Upload file
            </Button>
            </Box>
            <Box display="flex" alignItems="center" mb={2} sx={{ marginLeft: 1 }}>
                        <AssignmentIndIcon sx={{ mr: 1 }} />
                        <Typography variant="h4">Importer les souhaits des  via excel</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>

                    <input
                type="file"
                style={{ display: 'none' }}
                id="upload-file-souhaits-input"
                onChange={handleFileSouhaitsChange}
            />
            
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                htmlFor="upload-file-souhaits-input"
                sx={{ marginLeft: 6 }}

            >
                Upload file
            </Button>
            </Box>




                    
                    <Dialog open={openDialogFeild} onClose={closeResetDialogFeild}>
                        <DialogTitle>Ajouter une filière</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Entrez l'abréviation de la nouvelle filière :
                            </DialogContentText>
                        
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Abréviation de la filière"
                                type="text"
                                fullWidth
                                value={newFiliereAbbreviation}
                                onChange={(e) => setNewFiliereAbbreviation(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeResetDialogFeild} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={handleAddFiliere} color="primary">
                                Ajouter
                            </Button>
                        </DialogActions>
                    </Dialog>

                 </Collapse>

                 {/* <Box display="flex" alignItems="center" mt={4} mb={2} onClick={() => setShowUpdate(!showUpdate)}>
                  <SettingsBackupRestoreIcon sx={{ mr: 1 }} />
                  <ButtonBase>
    <Typography variant="h3">Gestion des ressources</Typography>
  </ButtonBase>                    </Box> */}
                    {/* <Typography variant="subtitle1" mb={2}>
                        modifier les données
                    </Typography> */}
                    <Collapse in={showUpdate}>
                    <Box display="flex" alignItems="center" mt={4} mb={2} onClick={() => handleOpenModifyLevel()}>
                  <ButtonBase>
    <Typography variant="h4">modifier les filière</Typography>
  </ButtonBase>                    </Box>
                  <ModifyLevel open={openModifyLevel} onClose={handleCloseModifyLevel} />
                  <Box display="flex" alignItems="center" mt={4} mb={2} onClick={() => handleOpenModifyStudent()}>
                  <ButtonBase>
    <Typography variant="h4">modifier étudiant</Typography>
  </ButtonBase>                    </Box>
                   <ModifyStudent open={openModifyStudent} onClose={handleCloseModifyStudent} />

                   <Box display="flex" alignItems="center" mt={4} mb={2} onClick={() => handleOpenModifyProfessor()}>
                  <ButtonBase>
                   <Typography variant="h4">modifier professeur</Typography>
                  </ButtonBase>                   
                   </Box>
                   <ModifyProfessor open={openModifyProfessor} onClose={handleCloseModifyProfessor} />
                    </Collapse>
                    <Box display="flex" alignItems="center" mt={4} mb={2}>
                        <Delete sx={{ mr: 1 }} />
                        <Typography variant="h3">Réinitialiser les données</Typography>
                    </Box>
                    <Typography variant="subtitle1" mb={2}>
                        Cette section vous permet de supprimer toutes les absences, emplois du temps ainsi que les étudiants.
                    </Typography>
                    <Button variant="contained" color="error" onClick={openResetDialog}>
                        Réinitialiser les données
                    </Button>
                </Box>
            )}

            <Dialog open={openDialog} onClose={closeResetDialog}>
                <DialogTitle>Confirmation de réinitialisation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez confirmer en tapant "je confirme la réinitialisation" et en entrant votre mot de passe.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label='Tapez "je confirme la réinitialisation"'
                        type="text"
                        fullWidth
                        value={confirmationText}
                        onChange={handleConfirmationTextChange}
                    />
                    <TextField
                        margin="dense"
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        value={resetPassword}
                        onChange={handleResetPasswordChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeResetDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleResetData} color="error">
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbarSeverity}
                    onClose={handleSnackbarClose}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SettingsPage;






