'use client';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';

type Instrument = {
  _id: string;
  name: string;
  description?: string;
};

const AdminInstruments: React.FC = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [newInstrument, setNewInstrument] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingInstrument, setEditingInstrument] = useState<Instrument | null>(
    null
  );

  useEffect(() => {
    fetchInstruments();
  }, []);

  const fetchInstruments = async () => {
    try {
      const response = await fetch('/api/instruments');
      const data = await response.json();
      setInstruments(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch instruments', error);
      setLoading(false);
    }
  };

  const handleAddInstrument = async () => {
    if (!newInstrument) return;

    try {
      const response = await fetch('/api/instruments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newInstrument, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to add instrument');
      }

      const result = await response.json();
      toast.success('Instrument added successfully');
      setInstruments([...instruments, result]);
      setNewInstrument('');
    } catch (error) {
      console.error('Error adding instrument:', error);
      toast.error('Failed to add instrument');
    }
  };
  const handleEditInstrument = (instrument: Instrument) => {
    setEditingInstrument(instrument);
    setNewInstrument(instrument.name);
    setDescription(instrument.description || '');
  };
  const handleUpdateInstrument = async () => {
    if (!editingInstrument) return;
    try {
      const response = await fetch('/api/instruments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingInstrument._id,
          name: newInstrument,
          description,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update instrument');
      }
      const result = await response.json();
      toast.success('Instrument updated successfully');
      setInstruments(
        instruments.map((inst) => (inst._id === result._id ? result : inst))
      );
      setEditingInstrument(null);
      setNewInstrument('');
      setDescription('');
    } catch (error) {
      console.error('Error updating instrument:', error);
      toast.error('Failed to update instrument');
    }
  };

  const handleDeleteInstrument = async (id: string) => {
    try {
      const response = await fetch(`/api/instruments?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete instrument');
      }

      toast.success('Instrument deleted successfully');
      setInstruments(instruments.filter((instrument) => instrument._id !== id));
    } catch (error) {
      console.error('Error deleting instrument:', error);
      toast.error('Failed to delete instrument');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Instruments</h1>
      <div className="mb-8">
        <input
          type="text"
          value={newInstrument}
          onChange={(e) => setNewInstrument(e.target.value)}
          className="border rounded-md p-2 mr-2"
          placeholder="New Instrument"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md p-2 mr-2"
          placeholder="Instrument Description"
        />
        {editingInstrument ? (
          <button
            onClick={handleUpdateInstrument}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Update Instrument
          </button>
        ) : (
          <button
            onClick={handleAddInstrument}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Instrument
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instruments.map((instrument) => (
          <div
            key={instrument._id}
            className="bg-white shadow-md rounded-lg overflow-hidden p-4"
          >
            <p className="text-gray-700 text-base mb-4">{instrument.name}</p>
            <p className="text-gray-500 text-sm mb-4">
              {instrument.description}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => handleEditInstrument(instrument)}
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                {' '}
                Edit{' '}
              </button>
              <button
                onClick={() => handleDeleteInstrument(instrument._id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInstruments;
