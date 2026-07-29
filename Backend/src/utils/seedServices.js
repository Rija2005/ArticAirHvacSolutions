// src/utils/seedServices.js
import Service from "../models/Service.js";

export const seedServices = async () => {
  try {
    const count = await Service.countDocuments();
    if (count > 0) {
      console.log(`Service catalog already seeded (${count} services found)`);
      return;
    }

    await Service.insertMany([
      { name: "Installation", description: "New AC and heating system installation.", basePrice: 450 },
      { name: "Repair", description: "Diagnosis and repair for HVAC breakdowns.", basePrice: 90 },
      { name: "Preventive Maintenance", description: "Seasonal tune-ups to extend system life.", basePrice: 60 },
      { name: "Duct Cleaning", description: "Improve air quality and system efficiency.", basePrice: 150 },
      { name: "Emergency Repair", description: "24/7 urgent response for critical failures.", basePrice: 120 },
      { name: "Thermostat Installation", description: "Smart and programmable thermostat setup.", basePrice: 75 },
    ]);

    console.log("Service catalog seeded (6 services created)");
  } catch (err) {
    console.error("[SEED ERROR] Failed to seed services:", err.message);
    // Don't crash the whole server startup over a seed failure — log and continue.
  }
};
