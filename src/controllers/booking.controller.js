const bookingService = require("../service/booking.service");


const getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookings();

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.log("Error fetching bookings:", error); 

    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.log("Error fetching booking:", error);

    if (error?.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};



const createBooking = async (req, res) => {
  try {

    const booking = await bookingService.createBooking(req.body);
    return res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.log("Error creating booking:", error);


  if (error.code === 'CONFLICT') {

      const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };

      if (error.vehicle && error.driver) {
        const vStart = formatDate(error.vehicleTime.start);
        const vEnd = formatDate(error.vehicleTime.end);

        const dStart = formatDate(error.driverTime.start);
        const dEnd = formatDate(error.driverTime.end);  

        return res.status(409).json({
          success: false,
          message: `รถไม่ว่างช่วง ${vStart} - ${vEnd} คนขับไม่ว่างช่วง ${dStart} - ${dEnd}`
        });
      }

      if (error.vehicle) {
        const start = formatDate(error.vehicleTime.start);
        const end = formatDate(error.vehicleTime.end);

        return res.status(409).json({
          success: false,
          message: `รถไม่ว่าง: ${start} - ${end} กรุณาเลือกเวลาใหม่หรือเปลี่ยนรถ`
        });
      }

        if (error.driver) {
          const start = formatDate(error.driverTime.start);
          const end = formatDate(error.driverTime.end);

          return res.status(409).json({
            success: false,
            message: `คนขับไม่ว่าง: ${start} - ${end} กรุณาเลือกเวลาใหม่หรือเปลี่ยนคนขับ`
          });
        }
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
  }
};

const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await bookingService.updateBooking(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.log("Error updating booking:", error);
    


  if (error.code === 'CONFLICT') {

      const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };

      if (error.vehicle && error.driver) {
        const vStart = formatDate(error.vehicleTime.start);
        const vEnd = formatDate(error.vehicleTime.end);

        const dStart = formatDate(error.driverTime.start);
        const dEnd = formatDate(error.driverTime.end);  

        return res.status(409).json({
          success: false,
          message: `รถไม่ว่างช่วง ${vStart} - ${vEnd} คนขับไม่ว่างช่วง ${dStart} - ${dEnd}`
        });
      }

      if (error.vehicle) {
        const start = formatDate(error.vehicleTime.start);
        const end = formatDate(error.vehicleTime.end);

        return res.status(409).json({
          success: false,
          message: `รถไม่ว่าง: ${start} - ${end} กรุณาเลือกเวลาใหม่หรือเปลี่ยนรถ`
        });
      }

        if (error.driver) {
          const start = formatDate(error.driverTime.start);
          const end = formatDate(error.driverTime.end);

          return res.status(409).json({
            success: false,
            message: `คนขับไม่ว่าง: ${start} - ${end} กรุณาเลือกเวลาใหม่หรือเปลี่ยนคนขับ`
          });
        }
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await bookingService.deleteBooking(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.log("Error deleting booking:", error);
    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};


module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};
