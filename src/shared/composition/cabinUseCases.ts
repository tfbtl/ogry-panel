import { CabinServiceAdapter } from "../../services/data/supabaseAdapter/CabinServiceAdapter";
import { GetCabinsUseCase } from "../../features/cabins/usecases/GetCabinsUseCase";
import { GetCabinUseCase } from "../../features/cabins/usecases/GetCabinUseCase";
import { CreateCabinUseCase } from "../../features/cabins/usecases/CreateCabinUseCase";
import { UpdateCabinUseCase } from "../../features/cabins/usecases/UpdateCabinUseCase";
import { DeleteCabinUseCase } from "../../features/cabins/usecases/DeleteCabinUseCase";

/**
 * Composition Root for Cabin UseCases
 * 
 * This module wires up UseCases with their concrete adapters.
 * UI layer should import UseCases from here, not directly.
 */
const cabinService = new CabinServiceAdapter();

export const getCabinsUseCase = new GetCabinsUseCase(cabinService);
export const getCabinUseCase = new GetCabinUseCase(cabinService);
export const createCabinUseCase = new CreateCabinUseCase(cabinService);
export const updateCabinUseCase = new UpdateCabinUseCase(cabinService);
export const deleteCabinUseCase = new DeleteCabinUseCase(cabinService);

