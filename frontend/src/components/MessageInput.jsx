import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const { sendMesssage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault()
    if(!text.trim() && !imagePreview) return;

    if(isSoundEnabled){
        playRandomKeyStrokeSound();
    }

    sendMesssage({
      text: text.trim(),
      image: imagePreview,
    })

    setText("");
    setImagePreview("");
    if(fileInputRef.current){
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

  };

  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current){
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>MessageInput</div>
  )
}

export default MessageInput