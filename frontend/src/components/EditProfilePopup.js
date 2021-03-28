import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
    
        props.onUpdateUser({
          name,
          about: description,
        });
      }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    

return (
    <PopupWithForm 
    title="Редактировать профиль"
    name="profile"
    button="Сохранить"
    isOpen={props.isOpen}
    onSubmit={handleSubmit}
    onClose={props.onClose}>
      <div>
      <input type="text" id="popup__field_name" className="popup__field popup__field_name" minLength="2" maxLength="40" required value={name || ''} onChange={handleNameChange} />
      <span className='popup__field_error popup__field_name_error'></span>
      <input type="text" id="popup__field_text" className="popup__field popup__field_text" minLength="2" maxLength="200" required value={description || ''} onChange={handleDescriptionChange} />
      <span className='popup__field_error popup__field_text_error'></span>
      </div>
    </PopupWithForm>
)
}

export default EditProfilePopup;