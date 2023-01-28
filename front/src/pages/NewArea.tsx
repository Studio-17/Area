import { theme } from '../constants/theme';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import ServicesModal from '../components/Modals/ServicesModal';
import ServicesInfos from '../components/ServicesInfos';
import BigRoundedButtonOutlined from '../components/Buttons/BigRoundedButtonOutlined';
import '../styles/NewArea.css';
import BigRoundedButton from '../components/Buttons/BigRoundedButton';

const NewArea = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [blockNumberSelected, setBlockNumberSelected] = useState<number>(0);
  const [serviceSelected, setServiceSelected] = useState<string>('');
  const [blocksState, setBlockState] = useState<any>([]);
  const [thensInstance, setthensInstance] = useState<any>([]);

  const onClickOpenModal = (index: number) => {
    setOpenModal(true);
    setBlockNumberSelected(index);
  };

  const onClickOnAreasCards: any = (actionContent?: string, reactionContent?: string) => {
    actionContent &&
      setBlockState((state: any) => [...state, { name: actionContent, service: serviceSelected }]);
    reactionContent &&
      setBlockState((state: any) => [
        ...state,
        { name: reactionContent, service: serviceSelected }
      ]);
    setServiceSelected('');
  };

  const onClickAddthens = () => {
    setthensInstance((thens: any) => [...thens, { type: 'then' }]);
  };

  const onClickOnSaveButton = () => {
    console.log(blocksState);
  };

  useEffect(() => {
    console.log(blocksState);
  }, [blocksState]);

  return (
    <>
      {!serviceSelected ? (
        <div
          className="new-area-main-container"
          style={{ backgroundColor: theme.palette.background }}>
          <div className="main-text">New coonie u said ?</div>
          <div className="if-then-container">
            <div className="if-container" style={{ backgroundColor: theme.palette.secondary }}>
              {blocksState[0] ? (
                <>
                  <div className="if-text">
                    <span style={{ margin: '0px 2vw' }}>IF</span>
                  </div>
                  <div className="infos-container">
                    <div className="action-service">{blocksState[0].service}</div>
                    <div className="action-name">{blocksState[0].name}</div>
                  </div>
                </>
              ) : (
                <div className="if-text">
                  <span style={{ margin: '0px 2vw' }}>IF</span>
                </div>
              )}
              <Fab
                style={{ position: 'absolute', right: 26, width: 50, height: 50 }}
                color="warning"
                onClick={() => onClickOpenModal(0)}>
                <AddIcon />
              </Fab>
            </div>
            {thensInstance.map((block: any, index: number) => (
              <>
                <div className="link" style={{ backgroundColor: theme.palette.common.grey }}></div>
                <div className="then-container" style={{ backgroundColor: theme.palette.primary }}>
                  {blocksState[index + 1] ? (
                    <>
                      <div className="if-text">
                        <span style={{ margin: '0px 2vw' }}>then</span>
                      </div>
                      <div className="infos-container">
                        <div className="action-service">{blocksState[index + 1].service}</div>
                        <div className="action-name">{blocksState[index + 1].name}</div>
                      </div>
                    </>
                  ) : (
                    <div className="if-text">
                      <span style={{ margin: '0px 2vw' }}>then</span>
                    </div>
                  )}
                  <Fab
                    style={{ position: 'absolute', right: 26, width: 50, height: 50 }}
                    color="warning"
                    onClick={() => onClickOpenModal(index + 1)}>
                    <AddIcon />
                  </Fab>
                </div>
              </>
            ))}
            <div className="more-thens-button">
              <BigRoundedButtonOutlined
                label="Add thens"
                color="primary"
                onClick={onClickAddthens}
              />
            </div>
          </div>
          <div className="save-button-container">
            <BigRoundedButton label="Save" color="primary" onClick={onClickOnSaveButton} />
          </div>
        </div>
      ) : (
        <ServicesInfos onClickOnAreasCards={onClickOnAreasCards} name={serviceSelected} />
      )}
      <ServicesModal
        setServiceSelected={setServiceSelected}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default NewArea;