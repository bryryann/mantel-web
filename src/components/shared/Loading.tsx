import './Loading.css';

const Loading: React.FC = () => {
    return (
        <div className='spinner-overlay'>
            <div className='loading-spinner' />
        </div>
    );
};

export default Loading;
