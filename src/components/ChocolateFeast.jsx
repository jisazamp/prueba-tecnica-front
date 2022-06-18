const ChocolateFeast = ({ currentClient, chocolateFeast }) => {
  return (
    <div className='content-container'>{`${currentClient} podría comer ${chocolateFeast} chocolates`}</div>
  );
};

export default ChocolateFeast;
