// reactstrap components
const AdminHeader = () => {
  return (
    <>
      <div
        className="header d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            "https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/546/cached.offlinehbpl.hbpl.co.uk/galleries/NAW/america.jpg" +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
      </div>
    </>
  );
};

export default AdminHeader;
