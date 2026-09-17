/**
 * SAFA — Object Detail & Relationship Inspector Modal
 * Deep inspection and connection graph management for any Universal Object.
 */

import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Button';
import { BaseObject, ObjectStatus, ObjectType } from '../../core/types/objects';
import { RelationshipType } from '../../core/types/relationships';
import { useObjects } from '../../core/context/ObjectContext';
import { useApp } from '../../core/context/AppContext';
import {
  Link2,
  Trash2,
  ShieldCheck,
  Tag as TagIcon,
  Plus,
  ArrowRight,
  ExternalLink,
  Calendar,
  Lock,
  HeartHandshake,
} from 'lucide-react';

export function ObjectDetailModal() {
  const { selectedObject, setSelectedObject, updateObject, deleteObject, linkObjects, unlinkObjects, getRelatedObjects, objects } = useObjects();
  const { addToast } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ObjectStatus>(ObjectStatus.ACTIVE);
  const [allowSLO, setAllowSLO] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [targetObjectId, setTargetObjectId] = useState('');
  const [linkType, setLinkType] = useState<RelationshipType>(RelationshipType.RELATED_TO);

  useEffect(() => {
    if (selectedObject) {
      setTitle(selectedObject.title);
      setDescription(selectedObject.description || '');
      setStatus(selectedObject.status);
      setAllowSLO(!!selectedObject.permissions?.allowSLOAccess);
      setIsLinking(false);
      setTargetObjectId('');
    }
  }, [selectedObject]);

  if (!selectedObject) return null;

  const related = getRelatedObjects(selectedObject.id);

  const handleSaveUpdates = async () => {
    try {
      await updateObject(selectedObject.id, {
        title,
        description,
        status,
        permissions: {
          ...selectedObject.permissions,
          allowSLOAccess: allowSLO,
        },
      });
      addToast('Object updated', 'success');
      setSelectedObject(null);
    } catch (err: any) {
      addToast(err.message || 'Failed to update', 'warning');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this object from SAFA?')) {
      try {
        await deleteObject(selectedObject.id);
        addToast('Object deleted', 'rose');
        setSelectedObject(null);
      } catch (err: any) {
        addToast(err.message || 'Failed to delete', 'warning');
      }
    }
  };

  const handleAddRelationship = async () => {
    if (!targetObjectId) return;
    try {
      await linkObjects(selectedObject.id, targetObjectId, linkType);
      addToast('Connected objects via graph relationship', 'success');
      setIsLinking(false);
      setTargetObjectId('');
    } catch (err: any) {
      addToast(err.message || 'Failed to link', 'warning');
    }
  };

  const availableTargets = objects.filter((o) => o.id !== selectedObject.id);

  return (
    <Modal
      isOpen={!!selectedObject}
      onClose={() => setSelectedObject(null)}
      title={`${selectedObject.type} Details`}
      subtitle={`ID: ${selectedObject.id} • Created ${new Date(selectedObject.createdAt).toLocaleDateString()}`}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Title input */}
        <div>
          <label className="block text-xs font-medium text-[#78716C] mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-[#E7E0D8] rounded-xl px-3.5 py-2 text-sm text-[#1C1917] font-medium focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-[#78716C] mb-1">Description / Notes</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white border border-[#E7E0D8] rounded-xl p-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880] resize-y"
          />
        </div>

        {/* Status selector */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-[#78716C] mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ObjectStatus)}
              className="w-full bg-white border border-[#E7E0D8] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
            >
              <option value={ObjectStatus.ACTIVE}>Active</option>
              <option value={ObjectStatus.INBOX}>Inbox</option>
              <option value={ObjectStatus.IN_PROGRESS}>In Progress</option>
              <option value={ObjectStatus.COMPLETED}>Completed</option>
              <option value={ObjectStatus.ARCHIVED}>Archived</option>
              <option value={ObjectStatus.PINNED}>Pinned</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-[#78716C] mb-1">Privacy & SLO</label>
            <button
              type="button"
              onClick={() => setAllowSLO(!allowSLO)}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                allowSLO
                  ? 'bg-[#FAF5F2] text-[#8C5D50] border-[#E8D5CE]'
                  : 'bg-stone-50 text-stone-600 border-stone-200'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{allowSLO ? 'SLO Access: Permitted' : 'Private (No Access)'}</span>
            </button>
          </div>
        </div>

        {/* Tags */}
        {selectedObject.tags?.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-[#78716C] mb-1.5">Tags</label>
            <div className="flex items-center gap-2 flex-wrap">
              {selectedObject.tags.map((t) => (
                <Tag key={t} label={t} color="neutral" />
              ))}
            </div>
          </div>
        )}

        {/* Connected Graph Relationships */}
        <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#EAE3D6] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-[#C5A880]" />
              Connected Graph Relations ({related.length})
            </h4>
            {!isLinking && (
              <button
                type="button"
                onClick={() => setIsLinking(true)}
                className="text-xs text-[#8C5D50] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Connect to Object
              </button>
            )}
          </div>

          {/* New Relationship Form */}
          {isLinking && (
            <div className="p-3 bg-white rounded-xl border border-[#E0D8CE] space-y-2 text-xs">
              <div className="font-medium text-stone-800">Add Relationship</div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value as RelationshipType)}
                  className="bg-stone-50 border border-stone-200 rounded-lg p-1.5"
                >
                  <option value={RelationshipType.RELATED_TO}>RELATED_TO</option>
                  <option value={RelationshipType.PART_OF}>PART_OF</option>
                  <option value={RelationshipType.BELONGS_TO}>BELONGS_TO</option>
                  <option value={RelationshipType.INSPIRED_BY}>INSPIRED_BY</option>
                  <option value={RelationshipType.DEPENDS_ON}>DEPENDS_ON</option>
                  <option value={RelationshipType.ABOUT}>ABOUT</option>
                </select>

                <select
                  value={targetObjectId}
                  onChange={(e) => setTargetObjectId(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-lg p-1.5"
                >
                  <option value="">Select target object...</option>
                  {availableTargets.map((t) => (
                    <option key={t.id} value={t.id}>
                      [{t.type}] {t.title.slice(0, 30)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsLinking(false)}
                  className="text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <Button size="sm" variant="rose" onClick={handleAddRelationship} disabled={!targetObjectId}>
                  Save Link
                </Button>
              </div>
            </div>
          )}

          {/* Linked Objects List */}
          {related.length === 0 ? (
            <p className="text-xs text-[#8C827D] italic">
              No relationships connected yet. Link this to projects, notes, or inspirations.
            </p>
          ) : (
            <div className="space-y-1.5">
              {related.map(({ rel, object: relObj }) => (
                <div
                  key={rel.id}
                  className="p-2.5 rounded-xl bg-white border border-[#EAE3D6] flex items-center justify-between text-xs group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-semibold text-[#8C5D50] bg-[#FAF5F2] px-2 py-0.5 rounded border border-[#E8D5CE]">
                      {rel.type}
                    </span>
                    <span className="font-medium text-stone-800 truncate">
                      {relObj?.title || 'Unknown Object'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => unlinkObjects(rel.id)}
                    className="text-stone-400 hover:text-red-500 cursor-pointer text-xs"
                    title="Unlink"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-3 flex items-center justify-between border-t border-[#F0ECE8]">
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-1.5 text-red-500" />
            Delete
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSelectedObject(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveUpdates}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
