import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Entity {
  id: string;
  name: string;
  primaryKeys: string[];
  attributes: string[];
  position?: { x: number; y: number };
}

interface Relationship {
  id: string;
  type: string;
  participants: {
    entityName: string;
    cardinality: string;
  }[];
  position?: { x: number; y: number };
}

interface ERDiagramState {
  entities: Entity[];
  relationships: Relationship[];
  addEntity: (entity: Entity) => void;
  updateEntityPosition: (id: string, position: { x: number; y: number }) => void;
  addRelationship: (relationship: Relationship) => string | void;
  updateRelationshipPosition: (id: string, position: { x: number; y: number }) => void;
  deleteEntity: (id: string) => void;
  deleteRelationship: (id: string) => void;
}

export const useERDiagramStore = create<ERDiagramState>()(
  persist(
    (set) => ({
      entities: [],
      relationships: [],
      
      addEntity: (entity) => 
        set((state) => ({ entities: [...state.entities, entity] })),
      
      updateEntityPosition: (id, position) =>
        set((state) => ({
          entities: state.entities.map((entity) =>
            entity.id === id ? { ...entity, position } : entity
          ),
        })),
      
      addRelationship: (relationship) =>
        set((state) => {
          const participantNames = relationship.participants.map(p => p.entityName).sort();
          
          const existingRelationshipIndex = state.relationships.findIndex(rel => {
            if (rel.participants.length !== relationship.participants.length) {
              return false;
            }
            
            const relParticipantNames = rel.participants.map(p => p.entityName).sort();
            return JSON.stringify(relParticipantNames) === JSON.stringify(participantNames);
          });

          if (existingRelationshipIndex !== -1) {
            // Update the existing relationship
            const updatedRelationships = [...state.relationships];
            const existingRelationship = updatedRelationships[existingRelationshipIndex];
            updatedRelationships[existingRelationshipIndex] = { 
              ...relationship, 
              id: existingRelationship.id, 
              position: existingRelationship.position 
            };
            return { relationships: updatedRelationships };
          }

          // Add new relationship if none exists
          return { relationships: [...state.relationships, relationship] };
        }),
      
      updateRelationshipPosition: (id, position) =>
        set((state) => ({
          relationships: state.relationships.map((rel) =>
            rel.id === id ? { ...rel, position } : rel
          ),
        })),
      
      deleteEntity: (id) => 
        set((state) => {
          const entityToDelete = state.entities.find(e => e.id === id);
          if (!entityToDelete) return state;
          
          const filteredRelationships = state.relationships.filter(rel => 
            !rel.participants.some(p => p.entityName === entityToDelete.name)
          );
          
          return { 
            entities: state.entities.filter(e => e.id !== id),
            relationships: filteredRelationships
          };
        }),
      
      deleteRelationship: (id) => 
        set((state) => ({ 
          relationships: state.relationships.filter((r) => r.id !== id) 
        })),
    }),
    {
      name: "er-diagram-storage",
    }
  )
);