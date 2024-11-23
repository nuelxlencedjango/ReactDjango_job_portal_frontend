{cartItems.map((item) => (
  <div
    key={item.id}
    className="p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
  >
    {/* Image and Name */}
    <div className="flex flex-col items-center">
      {item.artisan.profile_img ? (
        <img
          src={item.artisan.profile_img}
          alt={`${item.artisan.first_name}'s profile`}
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-300"></div>
      )}
      <span className="mt-2 text-lg font-medium text-gray-800">
        {item.artisan.first_name} {item.artisan.last_name}
      </span>
    </div>

    {/* Details */}
    <div className="flex flex-col flex-grow">
      <span className="text-gray-600">
        Service: {item.artisan.service}
      </span>
      <span className="text-gray-600">Pay: ${item.artisan.pay}</span>
    </div>

    {/* Remove Button */}
    <button
      onClick={() => handleRemoveFromCart(item.id)}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Remove
    </button>
  </div>
))}
