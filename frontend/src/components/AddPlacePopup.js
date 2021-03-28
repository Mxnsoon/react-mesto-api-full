import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {
    
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name,
            link,
        })
    }

    function nameOnChange(e) {
        setName(e.target.value);
    }

    function linkOnChange(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm
        title="Новое место"
        name="mesto"
        button="Создать"
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        onClose={props.onClose}>
          <div>
          <input type="text" id="popup__field_mesto-name" className="popup__field popup__field_mesto-name" placeholder="Название" minLength="1" maxLength="30" required onChange={nameOnChange} value={name} />
          <span className='popup__field_error popup__field_mesto-name_error'></span>
          <input type="url" id="popup__field_mesto-text" className="popup__field popup__field_mesto-text" placeholder="Ссылка на картинку" required onChange={linkOnChange} value={link} />
          <span className='popup__field_error popup__field_mesto-text_error'></span>
          </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;